# Data Model: Update all pnpm dependencies

**Feature**: `001-update-pnpm-deps`

## Entities

### Package Configuration (`package.json`)

The central entity modified by this feature.

**Attributes Impacted:**

- `scripts`: Adds `update-deps` command.
- `dependencies`: Versions updated to latest.
- `devDependencies`: Versions updated to latest.

**Validation:**

- Must be valid JSON.
- Dependency versions must be valid semantic version strings.

### Lockfile (`pnpm-lock.yaml`)

Generated entity reflecting the exact dependency tree.

**Attributes Impacted:**

- Entire tree is regenerated based on the new `package.json` constraints and the npm registry.

## Relationships

- `package.json` (Source of Truth) -> `pnpm install` -> `pnpm-lock.yaml` (Snapshot)
