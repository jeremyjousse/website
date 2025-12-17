# Research: Update all pnpm dependencies

**Feature**: `001-update-pnpm-deps`
**Status**: Complete

## Decisions

### Dependency Update Command

- **Decision**: Use `pnpm update --latest` (alias: `pnpm up -L`).
- **Rationale**:
  - This command updates all dependencies in `package.json` to their latest available versions, including major versions, and updates the `package.json` file content to reflect these new versions.
  - It aligns with the requirement to force an update to the absolute latest versions.
- **Alternatives considered**:
  - `pnpm update`: Only updates based on existing semver ranges (would not upgrade major versions).
  - `npm-check-updates` (ncu): Requires an external tool; `pnpm` has this built-in.

### Script Name

- **Decision**: `update-deps`
- **Rationale**: Clear, concise, and describes the action. Usage: `npm run update-deps` or `pnpm update-deps`.
- **Alternatives considered**: `upgrade`, `update-all` (verbose).

### Verification Workflow

- **Decision**: Chain the update with build and test commands in the developer workflow, or document it as a manual step. For the script itself, it should focus on the update.
- **Rationale**: Keeping the update script focused makes it composable. Developers can run `pnpm update-deps && pnpm test` if desired.

## Unknowns Resolved

- **Q**: How to force update all dependencies?
- **A**: `pnpm update --latest`.
