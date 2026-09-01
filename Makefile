# Makefile — framework Makefile, parametrizado por .specboot.json
#
# Intocable: el proyecto NO lo edita. Se parametriza vía `services` y `stack`
# declarados en .specboot.json. El proyecto adapta el linting/validación por
# servicio sin tocar este archivo.
#
# Lectura de config: `node -e` (convención del framework, nunca `jq`).
# `make ci` es el CI gate del PROYECTO (refs + solid-lint + lint + test + audit).
# La validación del framework en sí (`specboot.sh --ci`) es un "framework
# self-check" separado, NO un target de este Makefile.
#
# ============================================================================
# LOCAL ADAPTATIONS (intentional drift from upstream Specboot template)
# ============================================================================
# This project uses pnpm (lockfile is pnpm-lock.yaml) and Astro-only
# solid-lint. Lines marked with `# LOCAL` deviate from the upstream targets:
#   - install/lint/test/build/audit use pnpm instead of npm.
#   - solid-lint runs ONLY the Astro ESLint flat config (templates/ci/
#     eslintrc.astro.js, ESLint 9); no NestJS/Angular/dependency-cruiser.
#   - audit keeps the strict gate (no `|| true`): it must fail CI on
#     high-severity advisories.
# See CHANGELOG.md → Specboot framework upgrade v0.1.2, and
# docs/project/stack.md → "Adaptaciones locales del tooling".
# ============================================================================

.PHONY: help install lint test build audit solid-lint commitlint refs validate-specboot ci

SPEC_FILE := .specboot.json

# --- Lectura de .specboot.json con node -e (no jq) ---

# Servicios: array de rutas relativas. Default ["."] si falta/vacío.
SERVICES := $(shell node -e "try{var s=require('./$(SPEC_FILE)').services;if(Array.isArray(s)&&s.length)process.stdout.write(s.join(' '));else process.stdout.write('.');}catch(e){process.stdout.write('.');}" 2>/dev/null)

# Stack crudo: string o array. Vacío si no se declara.
RAW_STACK := $(shell node -e "try{var s=require('./$(SPEC_FILE)').stack;if(Array.isArray(s))process.stdout.write(s.join(' '));else if(s)process.stdout.write(s);}catch(e){}" 2>/dev/null)

# Stack autodetectado por presencia de manifiestos (cuando stack='auto' o no declarado).
DETECT_STACK := $(shell for d in $(SERVICES); do \
  [ -f "$$d/package.json" ] && echo "node"; \
  { [ -f "$$d/pyproject.toml" ] || [ -f "$$d/requirements.txt" ]; } && echo "python"; \
done | sort -u | tr '\n' ' ')

# Stack final: declarado, o autodetectado si está vacío o es "auto".
FINAL_STACK := $(if $(RAW_STACK),$(if $(filter auto,$(RAW_STACK)),$(DETECT_STACK),$(RAW_STACK)),$(DETECT_STACK))

# Guardas de stack (no vacías cuando el stack aplica).
HAS_NODE := $(findstring node,$(FINAL_STACK))
HAS_PYTHON := $(findstring python,$(FINAL_STACK))

# --- Help ---

help:
	@echo ""
	@echo "Targets del framework (parametrizados por .specboot.json):"
	@echo "  install           Instalar dependencias (raíz y servicios)"
	@echo "  lint              Linting propio del proyecto por servicio (pnpm run lint / ruff)"
	@echo "  test              Tests por servicio (pnpm test / pytest)"
	@echo "  build             Compilación por servicio (pnpm run build / python -m build)"
	@echo "  audit             Auditoría de dependencias (pnpm audit / pip-audit)"
	@echo "  solid-lint        SOLID/DIP (Astro ESLint — LOCAL adaptation)"
	@echo "  commitlint        Validar commits Git"
	@echo "  refs              Ejecutar check-refs.sh del proyecto"
	@echo "  validate-specboot Validar .specboot.json del proyecto (si validate-specboot.sh existe)"
	@echo "  ci                CI gate del proyecto: refs + solid-lint + lint + test + audit"
	@echo "  help              Esta ayuda"
	@echo ""
	@echo "Servicios detectados: $(SERVICES)"
	@echo "Stack detectado: $(FINAL_STACK)"
	@echo ""
	@echo "El Makefile es intocable: el proyecto no lo edita, solo declara services/stack."
	@echo "(LOCAL ADAPTATIONS: pnpm + Astro-only solid-lint — ver header)."
	@echo ""

# --- install ---

install:
	@echo "⚙️  install (services: $(SERVICES), stack: $(FINAL_STACK))"
	@for d in $(SERVICES); do \
	  if [ ! -d "$$d" ] && [ "$$d" != "." ]; then echo "⚠️  $$d no existe, saltando"; continue; fi; \
	  if [ -n "$(HAS_NODE)" ] && [ -f "$$d/package.json" ] && node -e "var p=require('./'+process.argv[1]+'/package.json');process.exit((p.dependencies||p.devDependencies)?0:1)" "$$d" 2>/dev/null; then \
	    echo "⚙️  $$d: pnpm install"; (cd "$$d" && pnpm install); \
	  elif [ -n "$(HAS_PYTHON)" ] && { [ -f "$$d/pyproject.toml" ] || [ -f "$$d/requirements.txt" ]; }; then \
	    echo "⚙️  $$d: pip install"; (cd "$$d" && { [ -f requirements.txt ] && pip install -r requirements.txt || pip install -e .; }); \
	  else echo "⚠️  $$d: sin stack/manifest aplicable, saltando"; fi; \
	done

# --- lint (lint PROPIO del proyecto) ---

lint:
	@echo "🔍 lint (services: $(SERVICES), stack: $(FINAL_STACK))"
	@for d in $(SERVICES); do \
	  if [ ! -d "$$d" ] && [ "$$d" != "." ]; then echo "⚠️  $$d no existe, saltando"; continue; fi; \
	  if [ -n "$(HAS_NODE)" ] && [ -f "$$d/package.json" ]; then \
	    if node -e "var p=require('./'+process.argv[1]+'/package.json');process.exit((p.scripts&&p.scripts.lint)?0:1)" "$$d" 2>/dev/null; then \
	      echo "🔍 $$d: pnpm run lint"; (cd "$$d" && pnpm run lint); \
	    else echo "⚠️  $$d: sin script 'lint', saltando"; fi; \
	  elif [ -n "$(HAS_PYTHON)" ] && [ -f "$$d/pyproject.toml" ]; then \
	    echo "🔍 $$d: ruff check ."; (cd "$$d" && ruff check .); \
	  else echo "⚠️  $$d: sin stack/manifest aplicable, saltando"; fi; \
	done

# --- test ---

test:
	@echo "🧪 test (services: $(SERVICES), stack: $(FINAL_STACK))"
	@for d in $(SERVICES); do \
	  if [ ! -d "$$d" ] && [ "$$d" != "." ]; then echo "⚠️  $$d no existe, saltando"; continue; fi; \
	  if [ -n "$(HAS_NODE)" ] && [ -f "$$d/package.json" ]; then \
	    if node -e "var p=require('./'+process.argv[1]+'/package.json');process.exit((p.scripts&&p.scripts.test)?0:1)" "$$d" 2>/dev/null; then \
	      echo "🧪 $$d: pnpm test"; (cd "$$d" && pnpm test); \
	    else echo "⚠️  $$d: sin script 'test', saltando"; fi; \
	  elif [ -n "$(HAS_PYTHON)" ] && [ -f "$$d/pyproject.toml" ]; then \
	    echo "🧪 $$d: pytest"; (cd "$$d" && pytest); \
	  else echo "⚠️  $$d: sin stack/manifest aplicable, saltando"; fi; \
	done

# --- build ---

build:
	@echo "🔨 build (services: $(SERVICES), stack: $(FINAL_STACK))"
	@for d in $(SERVICES); do \
	  if [ ! -d "$$d" ] && [ "$$d" != "." ]; then echo "⚠️  $$d no existe, saltando"; continue; fi; \
	  if [ -n "$(HAS_NODE)" ] && [ -f "$$d/package.json" ]; then \
	    if node -e "var p=require('./'+process.argv[1]+'/package.json');process.exit((p.scripts&&p.scripts.build)?0:1)" "$$d" 2>/dev/null; then \
	      echo "🔨 $$d: pnpm run build"; (cd "$$d" && pnpm run build); \
	    else echo "⚠️  $$d: sin script 'build', saltando"; fi; \
	  elif [ -n "$(HAS_PYTHON)" ]; then \
	    echo "🔨 $$d: python -m build"; (cd "$$d" && python -m build); \
	  else echo "⚠️  $$d: sin stack/manifest aplicable, saltando"; fi; \
	done

# --- audit ---

audit:
	@echo "🔒 audit (services: $(SERVICES), stack: $(FINAL_STACK))"
	@for d in $(SERVICES); do \
	  if [ ! -d "$$d" ] && [ "$$d" != "." ]; then echo "⚠️  $$d no existe, saltando"; continue; fi; \
	  if [ -n "$(HAS_NODE)" ] && [ -f "$$d/package.json" ]; then \
	    echo "🔒 $$d: pnpm audit"; (cd "$$d" && pnpm audit --audit-level=high); \
	  elif [ -n "$(HAS_PYTHON)" ] && { [ -f "$$d/pyproject.toml" ] || [ -f "$$d/requirements.txt" ]; }; then \
	    echo "🔒 $$d: pip-audit"; (cd "$$d" && pip-audit || true); \
	  else echo "⚠️  $$d: sin stack/manifest aplicable, saltando"; fi; \
	done

# --- solid-lint (SOLID/POO del framework) ---
# LOCAL: Astro-only. The upstream node branch (eslint@8 backend/frontend
# configs, madge, dependency-cruiser) does not apply to this stack; this
# project's Astro ESLint flat config requires ESLint 9 (plain `npx eslint`).

solid-lint:
	@if [ -z "$(HAS_NODE)" ] && [ -z "$(HAS_PYTHON)" ]; then \
	  echo "→ solid-lint: stack '$(FINAL_STACK)' no incluye node/python — saltando análisis de app (stack de framework/otro)."; \
	  exit 0; \
	fi; \
	ran_any=0; \
	for d in $(SERVICES); do \
	  if [ ! -d "$$d" ] && [ "$$d" != "." ]; then echo "⚠️  $$d no existe, saltando"; continue; fi; \
	  if [ -n "$(HAS_NODE)" ] && [ -d "$$d/src" ]; then \
	    ran_any=1; \
	    if [ -f templates/ci/eslintrc.astro.js ]; then \
	      echo "  → $$d: Astro ESLint (flat config, ESLint 9)"; \
	      npx eslint -c templates/ci/eslintrc.astro.js "$$d/src/**/*.{ts,astro}" || exit 1; \
	    fi; \
	  fi; \
	done; \
	if [ "$$ran_any" = "0" ]; then \
	  echo "❌ solid-lint: application code found but no SOLID config applies."; \
	  echo "   Add templates/ci/eslintrc.astro.js (Astro) or the stack-specific config."; \
	  exit 1; \
	fi; \
	echo "→ SOLID/POO static analysis: PASS"

# --- commitlint ---

commitlint:
	npx -p @commitlint/cli -p @commitlint/config-conventional commitlint --from HEAD~1 --to HEAD --verbose

# --- refs ---

refs:
	bash check-refs.sh

# --- validate-specboot (opcional) ---

validate-specboot:
	@if [ -f validate-specboot.sh ]; then \
	  echo "🔒 Validando .specboot.json del proyecto..."; \
	  bash validate-specboot.sh; \
	else \
	  echo "⚠️  validate-specboot.sh no disponible en este proyecto, saltando"; \
	fi

# --- ci (gate del proyecto consumidor) ---

ci: refs solid-lint lint test audit
	@echo ""
	@echo "✅ CI del proyecto completado"
	@echo "   Services: $(SERVICES)"
	@echo "   Stack: $(FINAL_STACK)"
