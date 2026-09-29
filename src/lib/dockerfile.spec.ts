// Contract tests for the multistage Dockerfile and .dockerignore added by
// change `add-dockerfile` (ticket DEPLOY-DOCKERFILE-001).
// RED phase: Dockerfile and .dockerignore do not exist yet — this suite must fail.
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_ROOT: string = resolve(process.cwd());

function readRepoFile(relativePath: string): string {
  return readFileSync(resolve(REPO_ROOT, relativePath), 'utf8');
}

/** Splits a Dockerfile into its named stages (FROM ... AS <name>). */
function parseStages(dockerfile: string): Readonly<Record<string, string>> {
  const stages: Record<string, string> = {};
  let currentStage = '';
  for (const line of dockerfile.split('\n')) {
    const fromMatch = /^FROM\s+\S+\s+AS\s+(\S+)/i.exec(line);
    if (fromMatch !== null && fromMatch[1] !== undefined) {
      currentStage = fromMatch[1];
      stages[currentStage] = '';
    }
    if (currentStage !== '') {
      stages[currentStage] += line + '\n';
    }
  }
  return stages;
}

function stageOrder(dockerfile: string): readonly string[] {
  const order: string[] = [];
  for (const match of dockerfile.matchAll(/^FROM\s+\S+\s+AS\s+(\S+)/gim)) {
    const stageName = match[1];
    if (stageName !== undefined) {
      order.push(stageName);
    }
  }
  return order;
}

describe('Dockerfile multistage contract (add-dockerfile / REQ-001..004, 006)', () => {
  let dockerfile: string;
  let stages: Readonly<Record<string, string>>;

  beforeAll(() => {
    dockerfile = readRepoFile('Dockerfile');
    stages = parseStages(dockerfile);
  });

  it('REQ-001/SC-001/SC-004: declares builder and runner stages in that order', () => {
    expect(stageOrder(dockerfile)).toEqual(['builder', 'runner']);
  });

  it('REQ-001: builder stage is based on node:22-alpine', () => {
    expect(dockerfile).toMatch(/^FROM\s+node:22-alpine\s+AS\s+builder/im);
  });

  it('REQ-001: runner stage is based on nginx:alpine', () => {
    expect(dockerfile).toMatch(/^FROM\s+nginx:alpine\s+AS\s+runner/im);
  });

  it('REQ-002/SC-001: builder installs pnpm@10 globally', () => {
    expect(stages['builder']).toContain('npm install -g pnpm@10');
  });

  it('REQ-002: builder copies .npmrc, package.json and pnpm-lock.yaml before installing', () => {
    const overridesCopy = /^COPY\s+.*\.npmrc.*package\.json.*pnpm-lock\.yaml/im;
    expect(dockerfile).toMatch(overridesCopy);
  });

  it('REQ-002: builder installs with frozen lockfile, then copies context, then builds', () => {
    const builderStage = stages['builder'] ?? '';
    const installIdx = builderStage.indexOf('pnpm install --frozen-lockfile');
    const copyAllIdx = builderStage.indexOf('COPY . .');
    const buildIdx = builderStage.indexOf('pnpm run build');
    expect(installIdx).toBeGreaterThan(-1);
    expect(copyAllIdx).toBeGreaterThan(installIdx);
    expect(buildIdx).toBeGreaterThan(copyAllIdx);
  });

  it('REQ-003/SC-002: builder receives NODE_AUTH_TOKEN as a build secret (ARG)', () => {
    expect(stages['builder']).toMatch(/^ARG\s+NODE_AUTH_TOKEN/m);
  });

  it('REQ-003/SC-003: no hardcoded (literal) registry auth token anywhere in the Dockerfile', () => {
    // Env-var references are the intended mechanism, not a violation:
    // `_authToken=${NODE_AUTH_TOKEN}` -> OK; `_authToken=ghp_...` -> violation.
    expect(dockerfile).not.toMatch(/_authToken=(?!\$\{)\S/);
  });

  it('REQ-003: NODE_AUTH_TOKEN is only used inside the builder stage', () => {
    expect(stages['runner']).not.toContain('NODE_AUTH_TOKEN');
  });

  it('REQ-004/SC-004: runner copies /app/dist into the nginx html directory', () => {
    expect(stages['runner']).toContain('COPY --from=builder /app/dist /usr/share/nginx/html');
  });

  it('REQ-004/SC-004: runner exposes port 80 and runs nginx in the foreground', () => {
    expect(stages['runner']).toMatch(/^EXPOSE\s+80$/m);
    expect(stages['runner']).toContain('CMD ["nginx", "-g", "daemon off;"]');
  });

  it('REQ-006/SC-002: header comment documents NODE_AUTH_TOKEN for Coolify', () => {
    expect(dockerfile).toMatch(/^#.*NODE_AUTH_TOKEN/m);
    expect(dockerfile).toMatch(/^#.*[Cc]oolify/m);
  });
});

describe('.dockerignore contract (REQ-005 / SC-005, SC-006)', () => {
  const ignoredEntries: readonly string[] = [
    '.git',
    'node_modules',
    'dist',
    '.env',
    '.env.*',
    '.specboot-backup-*',
    'openspec',
    'ai-specs',
    'docs'
  ];

  let dockerignore: string;

  beforeAll(() => {
    dockerignore = readRepoFile('.dockerignore');
  });

  it.each(ignoredEntries)('excludes %s from the build context', (entry: string) => {
    expect(dockerignore).toMatch(new RegExp(`^${entry.replace(/[.*]/g, '\\$&')}$`, 'm'));
  });

  it('does not exclude .npmrc (the Dockerfile copies it before installing)', () => {
    expect(dockerignore).not.toMatch(/^\.npmrc$/m);
  });

  it('[SC-006] build context carries no .env files, so the build works without one present', () => {
    // .env and .env.* are excluded above per-entry; this assert documents the
    // edge scenario explicitly (SC-006): no env file is required at build time.
    expect(dockerignore).toMatch(/^\.env$/m);
    expect(dockerignore).toMatch(/^\.env\.\*$/m);
  });
});

describe('framework-tooling-sync delta — project-owned intocables (REQ-007 / SC-007)', () => {
  let deltaSpec: string;

  beforeAll(() => {
    deltaSpec = readRepoFile(
      'openspec/changes/add-dockerfile/specs/framework-tooling-sync/spec.md'
    );
  });

  it('[SC-007] REQ-007: declares Dockerfile and .dockerignore as project-owned intocable files', () => {
    expect(deltaSpec).toContain('Project infrastructure files are intocable');
    expect(deltaSpec).toContain('Dockerfile');
    expect(deltaSpec).toContain('.dockerignore');
    expect(deltaSpec).toMatch(/project-owned intocable/i);
  });

  it('[SC-007] REQ-007: states specboot update never replaces them (not framework-owned)', () => {
    expect(deltaSpec).toMatch(/NOT framework-owned/i);
    expect(deltaSpec).toMatch(/specboot update`? never/i);
  });
});
