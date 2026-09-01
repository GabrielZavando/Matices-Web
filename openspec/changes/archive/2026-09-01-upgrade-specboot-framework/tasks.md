# Plan de Tareas: Upgrade del Framework Specboot v0.1.0 → v0.1.2

Cumple SDD: specs antes de código, TDD (test fallido primero: cada paso
valida `bash check-refs.sh` y `bash specboot.sh --ci` antes de continuar),
sin `any`, commits aislados. Adaptaciones intencionales del proyecto
preservadas en bloques `LOCAL ADAPTATIONS` documentados.

**Validación común a cada tarea:** `bash check-refs.sh` (exit 0) +
`bash specboot.sh --ci` (exit 0) + `bash validate-specboot.sh` (exit 0,
donde aplique).

---

## Fase 0: Pre-flight

- [x] **Snapshot del estado actual** (estimado: 5 min)
  - `bash specboot.sh --ci > /tmp/baseline-ci.txt 2>&1` (guardar baseline).
  - `cat /tmp/baseline-ci.txt` debe mostrar 0 errores (warnings OK).
  - `git status --short` debe estar limpio.
  - `ls openspec/changes/` no debe contener cambios activos (solo `archive/`).

- [x] **Crear rama de feature** (estimado: 1 min)
  - `git checkout -b chore/upgrade-specboot-v0.1.2` desde la rama base
    acordada con el dev (`main` recomendado).
  - **Push inicial** vacío para que CI corra y dé la línea base de CI
    antes del cambio (opcional, para comparar fallos post-cambio).

- [x] **Backup manual de archivos locales a preservar** (estimado: 2 min)
  - `mkdir -p .specboot-backup-$(date +%Y%m%d%H%M%S)`
  - `cp templates/ci/eslintrc.astro.js commitlint.config.js Makefile \
     .specboot-backup-*/`
  - Documentar en `CHANGELOG.md` (borrador) que el backup existe.

## Fase 1: Sync de scripts del framework

- [x] **Reemplazar `specboot.sh`** (estimado: 5 min)
  - `cp /tmp/opencode/specboot/specboot.sh specboot.sh`
  - `chmod +x specboot.sh`
  - **Test:** `bash specboot.sh --version` debe imprimir `unknown` o un
    número (el proyecto no tiene el framework como paquete npm, así que la
    versión se resuelve como "desconocida" hasta que exista
    `package.json` con el campo `version` o el paquete instalado).
  - **Test:** `bash specboot.sh --help` debe listar los subcomandos
    `init`, `update`, `--ci`, `--init`, `--version`, `--help`.
  - **Test:** `bash specboot.sh --ci` (puede fallar por archivos que aún
    no se han copiado; documentar el error y continuar).

- [x] **Reemplazar `check-refs.sh`** (estimado: 2 min)
  - `cp /tmp/opencode/specboot/check-refs.sh check-refs.sh`
  - `chmod +x check-refs.sh`
  - **Test:** `bash check-refs.sh` (puede fallar por las nuevas
    referencias a `.opencode/**` que aún no existen; documentar).

- [x] **Añadir `validate-specboot.sh`** (estimado: 2 min)
  - `cp /tmp/opencode/specboot/validate-specboot.sh validate-specboot.sh`
  - `chmod +x validate-specboot.sh`
  - **Test:** `bash validate-specboot.sh` debe imprimir warning
    "`.specboot.json` no encontrado" y exit 0 (es no-bloqueante, caso
    documentado en `specboot-json-standard.md` §5.1).

- [x] **Añadir `scripts/dogfood-check.sh`** (estimado: 1 min)
  - `mkdir -p scripts`
  - `cp /tmp/opencode/specboot/scripts/dogfood-check.sh scripts/`
  - `chmod +x scripts/dogfood-check.sh`
  - **Test:** `bash scripts/dogfood-check.sh` debe correr check-refs +
    specboot --ci (puede fallar en este punto del flujo; documentar).

## Fase 2: Eliminar `update.sh` (deprecado upstream)

- [x] **Verificar que nada referencia `update.sh`** (estimado: 2 min)
  - `grep -rl 'update.sh' .github Makefile commitlint.config.js \
     check-refs.sh specboot.sh AGENTS.md 2>/dev/null`
  - Resultado esperado: 0 hits (el proyecto no lo usa).

- [x] **Eliminar `update.sh`** (estimado: 1 min)
  - `git rm update.sh`
  - **Test:** `git status --short` muestra `D update.sh`.

## Fase 3: Adoptar layout `.opencode/` (frontmatter YAML)

- [x] **Crear directorios `.opencode/agents/` y `.opencode/commands/`**
  (estimado: 1 min)
  - `mkdir -p .opencode/agents .opencode/commands`

- [x] **Copiar 7 agentes desde upstream** (estimado: 5 min)
  - `cp /tmp/opencode/specboot/.opencode/agents/{plan,build,backend,\
     frontend,reviewer,verify,archive}.md .opencode/agents/`
  - **Test:** `ls .opencode/agents/` debe listar 7 archivos.

- [x] **Copiar 10 comandos desde upstream** (estimado: 5 min)
  - `cp /tmp/opencode/specboot/.opencode/commands/{plan-change,apply,\
     verify,archive,commit,deploy,enrich-us,adversarial-review,explain,\
     show-spec-working}.md .opencode/commands/`
  - **Test:** `ls .opencode/commands/` debe listar 10 archivos.

- [x] **Simplificar `opencode.json`** (estimado: 5 min)
  - Reescribir para que contenga solo:
    - `$schema`, `autoupdate`, `instructions[]` (con `docs/base-standards.md`
      y `AGENTS.md`), `permission` (igual que upstream).
    - **NO** `agent`, **NO** `command` (migrados a `.opencode/`).
  - Validar con `node -e "JSON.parse(require('fs').readFileSync('opencode.json'))"`.
  - **Test:** `bash specboot.sh --ci` (debe pasar; el nuevo specboot.sh ya
    no requiere `agent`/`command` en opencode.json).

- [x] **Verificar integridad referencial con `check-refs.sh`**
  (estimado: 2 min)
  - **Test:** `bash check-refs.sh` debe pasar (las `{file:...}` en los
    nuevos archivos `.opencode/**/*.md` resuelven a archivos existentes).
  - Si falla: ajustar las referencias (o copiar los archivos referenciados
    que falten).

## Fase 4: Sync de `ai-specs/`

- [x] **Sincronizar `ai-specs/` completo** (estimado: 5 min)
  - `git rm -r ai-specs/` (con cuidado: el proyecto no tiene
    personalizaciones locales en `ai-specs/` que valga preservar; el
    CHANGELOG documenta que las versiones se sincronizan desde upstream).
  - `cp -R /tmp/opencode/specboot/ai-specs ai-specs`
  - **Verificar:** `git status --short` muestra nuevos archivos en
    `ai-specs/` y los viejos como eliminados (sin merges raros).
  - **Test:** `bash check-refs.sh` debe pasar (las `{file:...}` en
    `ai-specs/skills/*/SKILL.md` resuelven).

- [x] **Verificar que las 4 skills nuevas existen** (estimado: 1 min)
  - `ls ai-specs/skills/{archive,verify,explain,show-spec-working}/SKILL.md`
  - Resultado esperado: 4 archivos listados.

- [x] **Verificar que los 2 agentes nuevos existen** (estimado: 1 min)
  - `ls ai-specs/agents/{archive-agent,verify-agent}.md`
  - Resultado esperado: 2 archivos listados.

## Fase 5: Reemplazar `AGENTS.md` (puente)

- [x] **Reemplazar `AGENTS.md`** (estimado: 2 min)
  - `cp /tmp/opencode/specboot/AGENTS.md AGENTS.md`
  - **Test:** `bash check-refs.sh` debe pasar.
  - **Test:** `bash specboot.sh --ci` debe pasar.

## Fase 6: Sync selectivo de `templates/ci/`

- [x] **Copiar 6 archivos desde upstream** (estimado: 5 min)
  - `cp /tmp/opencode/specboot/templates/ci/eslintrc.backend.js \
     templates/ci/eslintrc.backend.js`
  - `cp /tmp/opencode/specboot/templates/ci/eslintrc.frontend.js \
     templates/ci/eslintrc.frontend.js`
  - `cp /tmp/opencode/specboot/templates/ci/.dependency-cruiser.js \
     templates/ci/.dependency-cruiser.js`
  - `cp /tmp/opencode/specboot/templates/ci/.madge.config.json \
     templates/ci/.madge.config.json`
  - `cp /tmp/opencode/specboot/templates/ci/package.ci.json \
     templates/ci/package.ci.json`
  - `cp /tmp/opencode/specboot/templates/ci/README.md templates/ci/README.md`

- [x] **NO copiar `eslintrc.astro.js` del upstream** (drift intencional)
  (estimado: 0 min, solo documentar)
  - El proyecto conserva su versión flat-config.
  - **Verificar:** `diff templates/ci/eslintrc.astro.js .specboot-backup-*/eslintrc.astro.js`
    debe ser 0 (idéntico al backup).

- [x] **NO copiar `.importlinter` ni `ruff.toml`** (Python-specific)
  (estimado: 0 min)
  - El proyecto es Astro/TypeScript; no aplica.

- [x] **Test: `make solid-lint`** (estimado: 3 min)
  - `make solid-lint` debe usar solo el config de Astro y pasar.
  - Si falla: revisar que `templates/ci/eslintrc.astro.js` flat-config
    sigue intacto y que las devDependencies (`eslint`, `typescript-eslint`,
    `eslint-plugin-astro`) siguen en `package.json`.

## Fase 7: Mover docs/ a layout canónico

- [x] **Mover `docs/api-spec.yml` → `docs/api/api-spec.yml`** (estimado: 10 min)
  - `mkdir -p docs/api`
  - `git mv docs/api-spec.yml docs/api/api-spec.yml`
  - **Auditar referencias:** `grep -rl 'docs/api-spec.yml' .` (excluir
    `.git/`, `node_modules/`, `dist/`, `.astro/`).
  - **Actualizar** en `ai-specs/agents/*.md`,
    `ai-specs/skills/*/SKILL.md`, `.opencode/**/*.md` y `docs/*.md`.
  - **Test:** `bash check-refs.sh` debe pasar.
  - **Test:** `bash specboot.sh --ci` debe pasar (el nuevo specboot.sh
    requiere `docs/api/api-spec.yml` en `REQUIRED_FILES`).

- [x] **Mover `docs/data-model.md` → `docs/data-model/data-model.md`**
  (estimado: 10 min)
  - `mkdir -p docs/data-model`
  - `git mv docs/data-model.md docs/data-model/data-model.md`
  - Misma auditoría de referencias.
  - **Tests:** igual que arriba.

## Fase 8: Adoptar 6 docs/ intocables del framework

- [x] **Copiar 6 docs/ intocables** (estimado: 5 min)
  - `cp /tmp/opencode/specboot/docs/framework-contract.md docs/framework-contract.md`
  - `cp /tmp/opencode/specboot/docs/docs-standard.md docs/docs-standard.md`
  - `cp /tmp/opencode/specboot/docs/specboot-json-standard.md docs/specboot-json-standard.md`
  - `cp /tmp/opencode/specboot/docs/versioning-standard.md docs/versioning-standard.md`
  - `cp /tmp/opencode/specboot/docs/git-workflow-standards.md docs/git-workflow-standards.md`
  - `cp /tmp/opencode/specboot/docs/ci-standards.md docs/ci-standards.md`
  - **Test:** `bash specboot.sh --ci` debe pasar con los 6 docs/ en su
    `REQUIRED_FILES` ampliado.

- [x] **Reemplazar `docs/base-standards.md` con la versión upstream**
  (estimado: 2 min)
  - `cp /tmp/opencode/specboot/docs/base-standards.md docs/base-standards.md`
  - **Test:** `bash specboot.sh --ci` debe pasar.

## Fase 9: Migrar contexto del proyecto a `docs/project/`

- [x] **Crear `docs/project/` y 3 archivos** (estimado: 10 min)
  - `mkdir -p docs/project`
  - **Escribir `docs/project/stack.md`** con el contenido actual de
    `docs/base-standards.md` §8 (lenguaje del código, documentación) +
    stack real (Astro 6, TypeScript strictest, Tailwind v4, Vitest,
    web3forms) + reglas SOLID adaptadas a Astro (de §9).
  - **Escribir `docs/project/client.md`** con datos de Matices
    Consultoría Integral: cliente (Matices), audiencia B2B, ubicación
    (Viña del Mar, Chile), canales de contacto.
  - **Escribir `docs/project/domain.md`** con el dominio: consultoría
    B2B (reclutamiento, evaluación psicológica, formación, gestión de
    talento, I+D, testing psicométrico); objetivo (generación de
    prospectos, venta consultiva).
  - **Test:** `bash specboot.sh --ci` no debe quejarse de estos archivos
    (no están en `REQUIRED_FILES`; son del proyecto y el bridge los
    referencia como conditional prose, no como `{file:...}`).

- [x] **Verificar que el nuevo `AGENTS.md` v0.1.2 ya los referencia**
  (estimado: 1 min)
  - `grep -A2 'project/' AGENTS.md` debe listar la mención de
    `docs/project/{domain,stack,client}.md`.

## Fase 10: Crear manifiesto y self-check

- [x] **Actualizar `package.json` version como marcador de framework** (estimado: 2 min)
  - Subir `version` de `0.0.1` a `0.1.2` en el `package.json` raíz.
  - **Por qué:** `validate-specboot.sh` resuelve la versión instalada vía
    `specboot.sh --version`, que lee el package.json raíz (quirk upstream
    documentado en design.md §7.1). Los releases del sitio usan git tags,
    no este campo, así que no hay impacto funcional.
  - **Test:** `bash specboot.sh --version` debe imprimir `0.1.2`.

- [x] **Crear `.specboot.json`** (estimado: 3 min)
  - Contenido:
    ```json
    {
      "frameworkVersion": "0.1.2",
      "name": "matices-web",
      "description": "Sitio corporativo de Matices Consultoría Integral (Viña del Mar, Chile). Stack: Astro 6 SSG + Tailwind v4 + web3forms serverless.",
      "services": ["."],
      "stack": ["node"]
    }
    ```
  - **Test:** `bash validate-specboot.sh` debe pasar con
    `frameworkVersion` (0.1.2) coincidente con la instalada (0.1.2).

- [x] **Actualizar `.gitignore`** (estimado: 1 min)
  - Añadir `.specboot-backup-*` al final del archivo.
  - **Test:** `git status --short` no lista el directorio de backup.

- [x] **Limpiar backup manual** (estimado: 1 min)
  - `rm -rf .specboot-backup-*` (ya están en `.gitignore`).

## Fase 11: Reemplazar `Makefile` y restaurar overrides `pnpm`

- [x] **Reemplazar `Makefile`** (estimado: 2 min)
  - `cp /tmp/opencode/specboot/Makefile Makefile`

- [x] **Restaurar overrides `pnpm` y solid-lint Astro-only** (estimado: 10 min)
  - Editar `Makefile` para:
    - `install`: `pnpm install` (no `npm install`).
    - `lint`: `pnpm run lint` (no `npm run lint`).
    - `test`: `pnpm test` (no `npm test`).
    - `build`: `pnpm run build` (no `npm run build`).
    - `audit`: `pnpm audit --audit-level=high` (no `npm audit`).
    - `solid-lint`: solo el branch de Astro
      (`templates/ci/eslintrc.astro.js`); eliminar los branches de NestJS,
      Angular, dependency-cruiser.
  - Añadir un banner de comentarios al final del archivo:
    ```makefile
    # ============================================================================
    # LOCAL ADAPTATIONS (intentional drift from upstream Specboot template)
    # ============================================================================
    # This project uses pnpm (lockfile is pnpm-lock.yaml) and Astro-only
    # solid-lint. See CHANGELOG.md → [Unreleased] / specboot framework
    # upgrade v0.1.2.
    # ============================================================================
    ```
  - **Test:** `make install` debe ejecutar `pnpm install` y pasar.
  - **Test:** `make lint` debe ejecutar `pnpm run lint` y pasar.
  - **Test:** `make test` debe ejecutar `pnpm test` y pasar.
  - **Test:** `make build` debe ejecutar `pnpm run build` y pasar.
  - **Test:** `make audit` debe ejecutar `pnpm audit` y pasar.
  - **Test:** `make solid-lint` debe ejecutar solo el config Astro y pasar.

## Fase 12: CI gate `specboot --ci`

- [x] **Añadir job `specboot-ci` en `.github/workflows/ci.yml`** (estimado: 5 min)
  - Insertar después del job `lint` (o como parte de él):
    ```yaml
    specboot-ci:
      name: Specboot Framework CI
      runs-on: ubuntu-latest
      steps:
        - name: Checkout
          uses: actions/checkout@v4
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: ${{ env.NODE_VERSION }}
        - name: Bash check-refs
          run: bash check-refs.sh
        - name: Bash specboot --ci
          run: bash specboot.sh --ci
    ```
  - `needs: [lint]` para que corra solo si lint pasa.
  - **Test:** push a la rama y verificar que el job corre y pasa.

## Fase 13: Actualizar CHANGELOG

- [x] **Documentar el upgrade en `CHANGELOG.md`** (estimado: 5 min)
  - Bajo `## [Unreleased]`, añadir bloque `### Changed` con:
    - Lista de archivos reemplazados (con justificación de los que se
      preservaron con override, p.ej. `eslintrc.astro.js` flat-config).
    - Lista de archivos creados (`.opencode/`, `.specboot.json`,
      `validate-specboot.sh`, `scripts/`, nuevos docs/, etc.).
    - Lista de archivos eliminados (`update.sh`).
    - Movimientos de paths (`docs/api-spec.yml` → `docs/api/api-spec.yml`,
      etc.).
    - Salto de framework version (0.1.0 → 0.1.2).
  - Mantener las entradas previas de `[Unreleased]` (si las hay) y
    añadir las nuevas.

## Fase 14: Verificación end-to-end

- [x] **Smoke test completo del framework** (estimado: 5 min)
  - `bash check-refs.sh` → exit 0.
  - `bash specboot.sh --ci` → exit 0.
  - `bash validate-specboot.sh` → exit 0.
  - `bash scripts/dogfood-check.sh` → exit 0 (corre los 3 anteriores).
  - **Comparar** con `cat /tmp/baseline-ci.txt`; el nuevo no debe tener
    nuevos errores (puede tener 0 warnings o algunos esperados).

- [x] **Smoke test del proyecto (Make targets)** (estimado: 5 min)
  - `make install` → pnpm install OK.
  - `make lint` → pasa.
  - `make test` → vitest pasa.
  - `make build` → astro build OK.
  - `make solid-lint` → Astro ESLint pasa.
  - `make audit` → pnpm audit OK (puede mostrar advisories, exit 0 con
    `--audit-level=high` no debe romper; si rompe, restaurar overrides
    `pnpm.overrides` que ya documentan el fix).

- [x] **Smoke test de OpenCode** (estimado: 10 min)
  - Abrir el proyecto con `opencode` en una terminal.
  - Invocar `/plan-change` con un ticket dummy (p.ej. `TEST-001:"Smoke
    test"`). Debe:
    - Cargar `AGENTS.md` correctamente.
    - Cargar `.opencode/commands/plan-change.md` con su frontmatter.
    - Crear la carpeta del change.
  - Invocar `/commit` con un commit dummy. Debe:
    - Respetar el nuevo flujo token-light del skill `commit` v0.1.2.
    - Pasar commitlint (con `commitlint.config.js` del proyecto, no el
      `.commitlintrc.json` upstream).
  - **Limpiar:** `openspec new change` se puede archivar vacío o dejar
    activo para cleanup posterior.

## Fase 15: Archivar y mergear

- [ ] **Commit final del change** (estimado: 5 min)
  - `git status --short` debe mostrar solo archivos esperados.
  - `git add .` + commit
    `chore(specs): upgrade specboot framework to v0.1.2` con cuerpo
    detallado (resumen de las 15 fases, archivos clave, link al
    OpenSpec change `upgrade-specboot-framework`).

- [ ] **Push y PR** (estimado: 10 min)
  - `git push -u origin chore/upgrade-specboot-v0.1.2`
  - Abrir PR con descripción: link al OpenSpec change, lista de
    adaptaciones locales preservadas, capturas de `specboot.sh --ci` y
    `make ci` pasando.
  - Esperar CI verde (todos los jobs, incluyendo el nuevo
    `specboot-ci`).
  - Review del dev (auto-review si es el mismo dev).

- [ ] **Merge a `main`** (estimado: 5 min)
  - Merge commit (no squash) para preservar la trazabilidad de los
    commits aislados por fase.
  - El commit de merge puede usar `merge: integrate specboot v0.1.2
    upgrade` (exento de type-enum por el ignore function-based de
    `commitlint.config.js`).

- [ ] **Post-merge: archivar el OpenSpec change** (estimado: 5 min)
  - `openspec archive upgrade-specboot-framework` (corre automáticamente
    los pasos de archive, valida, mueve a `openspec/archive/2026-09-01-upgrade-specboot-framework/`).
  - El comando consolida los 3 specs (`framework-tooling-sync`,
    `opencode-layout`, `specboot-manifest`) en `openspec/specs/`.
  - **Test:** `bash specboot.sh --ci` sigue pasando post-archive.

---

## Resumen de orden crítico

1. **Fase 0** (pre-flight, sin tocar archivos) → 2. **Fase 1** (scripts
   del framework) → 3. **Fase 3** (`.opencode/` + opencode.json) → 4.
   **Fase 4** (`ai-specs/`) → 5. **Fase 5** (`AGENTS.md`) → 6. **Fase 7**
   (mover docs/api-spec y data-model) → 7. **Fase 8** (6 docs/ intocables)
   → 8. **Fase 9** (migrar contexto a `docs/project/`) → 9. **Fase 10**
   (`.specboot.json`) → 10. **Fase 6** (templates/ci/ selectivo) → 11.
   **Fase 11** (Makefile + overrides) → 12. **Fase 12** (CI gate) → 13.
   **Fase 13** (CHANGELOG) → 14. **Fase 14** (smoke test) → 15. **Fase
   2** (eliminar `update.sh` — movido al final para no romper nada que lo
   pueda invocar durante el flujo) → 16. **Fase 15** (archivar y mergear).

> Nota: la **Fase 2** (eliminar `update.sh`) se movió al final del orden
> para minimizar el riesgo de que algo en mitad del flujo lo invoque.
> Aunque la verificación de la Fase 2 (paso 1) confirma que nada lo usa,
> retrasar la eliminación reduce la ventana de "código que referencia
> update.sh en algún script" a 0.
