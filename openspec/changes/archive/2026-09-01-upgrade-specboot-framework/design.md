# Design: upgrade-specboot-framework

> Decisiones arquitectónicas del upgrade Specboot v0.1.0 → v0.1.2. Cada
> decisión justifica la elección sobre las alternativas evaluadas. El
> contrato framework ↔ proyecto se documenta en `docs/framework-contract.md`
> (intocable, distribuido por el framework), cuya sección *Frontera
> intocable / del proyecto* es la fuente de verdad sobre quién puede editar
> qué.

## 1. Estrategia de migración a `.opencode/`

**Decisión:** adopción **inmediata y completa** del layout upstream
(`.opencode/agents/*.md` + `.opencode/commands/*.md` con frontmatter YAML) y
simplificación simultánea de `opencode.json` a solo `instructions[]` +
`permission` + `autoupdate`.

**Por qué no híbrido:** mantener `agent`/`command` inline en `opencode.json`
además de `.opencode/` provoca **doble carga de prompts** en cada invocación
(OpenCode parsea ambas) y potenciales conflictos de permisos (las dos fuentes
definen `edit`/`bash` para los mismos agentes). El upstream v0.1.2 ya no
mantiene el layout inline; sincronizar con un layout híbrido genera drift
permanente.

**Por qué no quedarse en el layout inline actual:** el upstream distribuye
`@gabrielzavando/specboot` con layout canónico `.opencode/`. El primer
`specboot update` o `npm install` que se ejecute rompería el contrato
silenciosamente (los `{file:.opencode/...}` referenciados en las skills no
existirían en el proyecto).

**Riesgo aceptado:** `opencode.json` pasa de 91 a ~20 líneas. La pérdida de
"todo en un archivo" se compensa con (a) los 17 archivos `.opencode/**/*.md`
que son self-documenting vía su frontmatter, y (b) el nuevo `AGENTS.md`
puente que referencia explícitamente cada agente/comando.

## 2. Manejo de `base-standards.md` (intocable)

**Decisión:** aceptar el `base-standards.md` upstream v0.1.2 (neutro, sin
mención de Astro) **y migrar el contexto del proyecto Matices a
`docs/project/{stack,client,domain}.md`**, que el upstream v0.1.2 introduce
precisamente para este caso.

**Por qué no restaurar §8/§9 como patch local:** el contrato del framework
declara `base-standards.md` como **intocable**. Patchearlo localmente es
drift permanente: el próximo `specboot update` sobreescribirá el patch sin
advertencia (el script no sabe que es local). Ya hay precedente de drift
intencional documentado (`eslintrc.astro.js` flat-config, `Makefile` con
`pnpm`) — añadir un tercer parche sobre `base-standards.md` cruza el
umbral de "excepciones gestionables" y se convierte en "el framework ya no
escaneará bien este proyecto".

**Por qué sí migrar a `docs/project/*.md`:** el nuevo `AGENTS.md` v0.1.2
declara explícitamente (§2.2) que `docs/project/{domain,stack,client}.md`
son **del proyecto** y los referencia como "conditional prose" (no como
`{file:...}`, para no romper `check-refs.sh`). El contexto queda donde el
framework lo espera, sin violar la frontera intocable.

**Contenido a migrar:**
- `docs/base-standards.md` §8 → `docs/project/stack.md` + `docs/project/client.md`.
- `docs/base-standards.md` §9 → `docs/project/stack.md` (reglas SOLID adaptadas
  a Astro como nota del proyecto, no del framework).

## 3. Overrides locales en `Makefile` (preservar `pnpm` y solid-lint Astro-only)

**Decisión:** reemplazar `Makefile` con el upstream v0.1.2 (parametrizado por
`.specboot.json`) y restaurar los overrides `pnpm` + `solid-lint` solo-Astro
como bloque **`LOCAL ADAPTATIONS`** al final del archivo, separado
visualmente con un banner de comentarios.

**Por qué no un `Makefile.local` que se incluya desde el `Makefile` upstream:**
introducir un nuevo archivo en el set intocable (el `Makefile` upstream
`include` algo externo) es más invasivo que un patch local bien documentado.
El bloque `LOCAL ADAPTATIONS` mantiene la política actual del proyecto:
"drift intencional donde sea necesario, documentado en el propio archivo".

**Por qué no `npm` y un `pnpm` solo en CI:** el dev local usa `pnpm` también
(no solo CI). Forzar `npm install` rompe el lockfile y reescribe
`pnpm-lock.yaml`. El lockfile es `pnpm-lock.yaml`; el proyecto es
intencionalmente pnpm.

**Bloque de overrides a restaurar:**

```makefile
# ============================================================================
# LOCAL ADAPTATIONS (intentional drift from upstream Specboot template)
# ============================================================================
# This project uses pnpm (lockfile is pnpm-lock.yaml) and Astro-only
# solid-lint. See CHANGELOG.md → [Unreleased] / specboot framework
# upgrade v0.1.2.
# ============================================================================

install: ## Install dependencies (stack-specific) — LOCAL: pnpm
	@case "$(STACK)" in \
	  node)   pnpm install ;; \
	  ...

lint: ## Lint — LOCAL: pnpm
	@case "$(STACK)" in \
	  node)   pnpm run lint ;; \
	  ...

# (idem para test, build, audit, solid-lint)
```

## 4. Preservación de `templates/ci/eslintrc.astro.js` (flat config)

**Decisión:** **NO copiar** la versión upstream de `eslintrc.astro.js` (que
vuelve al formato legacy para ESLint 8). Conservar la versión flat-config
del proyecto (ESLint 9). El proyecto ya documenta este drift en el header
del archivo y en `CHANGELOG.md` línea 11.

**Por qué:** ESLint 9 deprecó el formato legacy. El proyecto usa
`@eslint/js` + `typescript-eslint` + `eslint-plugin-astro` con sintaxis de
flat config (`export default [...]`). El upstream v0.1.2 distribuye
`module.exports = { ... }` que ESLint 9 rechaza. Mezclar el flat-config
del proyecto con cualquier otro ESLint config del upstream generaría
conflictos en `make solid-lint`.

**Tradeoff:** el proyecto no se beneficia de los refinamientos upstream
de `eslintrc.astro.js` (no hay muchos en v0.1.2, pero los hay). Aceptable
porque el archivo del proyecto ya incorpora las reglas SOLID que el
upstream v0.1.2 añade en sus otros configs (`max-lines` 400, `complexity`
10, `sonarjs/cognitive-complexity`).

## 5. Eliminación de `update.sh` (deprecación upstream)

**Decisión:** eliminar `update.sh` del proyecto. El upstream v0.1.2 lo
deprecó formalmente (mensaje explícito en el header del archivo: "modo de
sincronización deprecado, el camino canónico es `specboot update`"). El
`update.sh` del upstream v0.1.2 solo conserva `--bump` para maintainers
del framework (que bumpean la versión antes de merge a main); no aplica
al proyecto.

**Verificación previa:** el proyecto no usa `update.sh` en CI, scripts ni
hooks (búsqueda exhaustiva: `grep -r 'update.sh' .github Makefile
commitlint.config.js check-refs.sh specboot.sh AGENTS.md` retorna 0 hits
relevantes). No hay tags git en el proyecto (no se ha usado
`update.sh --bump`).

**Mitigación:** documentar en `CHANGELOG.md` que la actualización del
framework ahora se hace vía `specboot update` (subcomando de
`specboot.sh`). Si en el futuro se quiere bumpear la versión del proyecto,
se puede añadir un script equivalente al `update.sh --bump` upstream, pero
es un problema separado.

## 6. Movimiento de `docs/api-spec.yml` y `docs/data-model.md`

**Decisión:** mover a `docs/api/api-spec.yml` y `docs/data-model/data-model.md`
(ubicación canónica del upstream v0.1.2). Actualizar **todas** las
referencias en el proyecto.

**Auditoría de referencias (pre-move):** `grep -rl 'docs/api-spec.yml\|docs/data-model.md' .`
devuelve: agents (`backend-developer.md`, `build-agent.md`,
`frontend-developer.md`), skills (`enrich-us/SKILL.md`, `code-auditing/SKILL.md`,
`onboarding/SKILL.md`), y posiblemente specs OpenSpec archivados que
referencien por texto (no son `{file:...}`, son narrativa).

**No se mueven:** los archivos en `openspec/changes/**/specs/*/spec.md` que
mencionen los paths originales por texto. Las specs archivadas son
historial inmutable; cualquier referencia por narrativa queda como está
(eran paths válidos cuando se escribieron).

**Sí se actualizan:** los `{file:...}` en `ai-specs/**` y en
`.opencode/**/*.md` (estos sí se validan con `check-refs.sh`).

**Test post-move:** `bash check-refs.sh` debe pasar; `bash specboot.sh --ci`
debe listar los nuevos paths en `REQUIRED_FILES` y pasar.

## 7. Manifest `.specboot.json`

**Decisión:** crear `.specboot.json` con `frameworkVersion: "0.1.2"`,
`services: ["."]` (todo el repo es un servicio Astro), `stack: ["node"]`.
Sin `extraStandards` (el proyecto no necesita cargar docs/ extra más allá
de los que el AGENTS bridge ya carga). Sin `layers` (el proyecto es
single-layer Astro; las "capas" se manejan con smart/dumb a nivel de
carpeta `src/components` y `src/lib`, no se documenta formalmente).

**Por qué `stack: ["node"]` y no `"framework"`:** el `stack: "framework"`
en upstream se usa para el repo del framework mismo (dogfooding) donde no
hay código de aplicación que lintear. El proyecto Matices SÍ tiene código
de aplicación (`src/**`) y debe ser linteado por `make solid-lint`; por
tanto `"node"` aplica.

### 7.1 Quirk de resolución de versión (descubierto durante /apply)

**Hallazgo:** `validate-specboot.sh` resuelve la versión "instalada" del
framework con esta precedencia: (1) `specboot.sh --version`; (2)
`node_modules/@gabrielzavando/specboot/package.json`; (3) el
`package.json` raíz. Pero `specboot.sh --version` (paso 1) lee
incondicionalmente el `package.json` de su propio directorio — que en un
proyecto consumidor es el **package.json de la app**. Resultado: para este
proyecto la versión instalada resuelve siempre a `0.0.1` (versión actual
de la app), y declarar `frameworkVersion: "0.1.2"` sería error duro
("proyecto requiere versión más nueva del framework"), rompiendo CI.

**Decisión:** el campo `version` del `package.json` del proyecto pasa de
`0.0.1` a `0.1.2` y actúa como **marcador de la versión del framework
sincronizada**. Justificación:

- El versionado de releases del sitio se maneja con git tags `v*.*.*`
  (`.github/workflows/deploy.yml`); el campo `version` del package.json
  no consume nada (build/deploy/CI no lo leen), así que reutilizarlo no
  tiene impacto funcional.
- Declarar `frameworkVersion: "0.0.1"` pasaría validación pero sería
  mentiroso (el tooling está sincronizado a v0.1.2) y, peor: tras un
  futuro `specboot update` (que reescribe `frameworkVersion` a la nueva
  versión), el validador volvería a fallar hasta corregirlo a mano.
- Con la convención "package.json version = framework marker", el flujo
  futuro es determinista: `specboot update` → reescribe
  `frameworkVersion` → el dev bumpa `package.json` `version` al mismo
  valor → validación verde.

**Deuda upstream registrada:** este comportamiento es un bug latente del
framework para proyectos consumidores (la precedencia (1) ensombrece a
(2)/(3), y la doc de `specboot-json-standard.md` §3 declara que (3) es
"caso dogfooding"). Debe corregirse en el repo de Specboot vía su propio
flujo SDD (proponer que `specboot.sh --version` resuelva primero
`node_modules/@gabrielzavando/specboot` antes que el package.json raíz).
Queda registrado en el CHANGELOG de este change.

## 8. CI gate `specboot.sh --ci`

**Decisión:** añadir un job corto en `.github/workflows/ci.yml` (después de
`make lint` o como parte del job `lint`) que ejecute `bash specboot.sh --ci`
para hacer cumplir el contrato del framework en CI, alineado con el
upstream.

**Por qué:** sin gate en CI, los próximos `update.sh` o edits locales
pueden romper `check-refs.sh`, `validate-specboot.sh`, o introducir
placeholders en `docs/`, sin que el CI lo detecte. El gate es barato
(segundos, sin red), y trae paridad con el upstream.

**Alternativa descartada:** dejarlo solo como herramienta local. El
proyecto ya tiene 4 jobs en CI (lint, test, build, security-audit,
commitlint) — añadir uno más no es overhead significativo.

## 9. OpenSpec: tres specs consolidados (post-archive)

Cuando se archive el change, `openspec archive upgrade-specboot-framework`
consolida tres specs en `openspec/specs/`:

- **`framework-tooling-sync`** (ADDED): invariantes del contrato framework
  ↔ proyecto. El proyecto declara `frameworkVersion`; los archivos
  intocables se reemplazan vía `specboot update`; `docs/` (salvo los 5
  intocables) y código son del proyecto.
- **`opencode-layout`** (ADDED): invariantes de la nueva estructura
  `.opencode/{agents,commands}/*.md` con frontmatter YAML;
  `opencode.json` reducido; `{file:...}` resuelven.
- **`specboot-manifest`** (ADDED): invariantes de `.specboot.json`
  (campos requeridos, `frameworkVersion` coincide con la instalada,
  `services` apunta a rutas existentes).

Estos specs son **del framework aplicado al proyecto**, no del producto
Matices. Documentan la decisión arquitectónica de cómo el proyecto
integra el framework, para que cambios futuros (un próximo upgrade a
v0.2.x) tengan trazabilidad.

## 10. Orden de ejecución (resumen)

Las tareas en `tasks.md` siguen este orden crítico (cada paso valida
`check-refs.sh` + `specboot.sh --ci` antes de continuar):

1. **Fase 0** — pre-flight: backup manual de archivos locales a preservar.
2. **Fase 1** — sync `specboot.sh` + `check-refs.sh` + `validate-specboot.sh`.
3. **Fase 2** — eliminar `update.sh`.
4. **Fase 3** — crear `.opencode/{agents,commands}/` y simplificar
   `opencode.json`.
5. **Fase 4** — sync `ai-specs/`.
6. **Fase 5** — reemplazar `AGENTS.md`.
7. **Fase 6** — sync `templates/ci/` selectivo (sin `eslintrc.astro.js`).
8. **Fase 7** — mover `docs/api-spec.yml` y `docs/data-model.md`.
9. **Fase 8** — copiar 6 docs/ intocables + crear `docs/project/*.md`.
10. **Fase 9** — reemplazar `docs/base-standards.md` (neutro) y restaurar
    contexto en `docs/project/`.
11. **Fase 10** — crear `.specboot.json` y `scripts/dogfood-check.sh`.
12. **Fase 11** — reemplazar `Makefile` y restaurar overrides `pnpm`.
13. **Fase 12** — añadir job `specboot --ci` en `.github/workflows/ci.yml`.
14. **Fase 13** — actualizar `CHANGELOG.md`.
15. **Fase 14** — smoke test end-to-end + smoke test OpenCode.
16. **Fase 15** — `/archive upgrade-specboot-framework`.
