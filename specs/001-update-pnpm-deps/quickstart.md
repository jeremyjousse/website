# Quickstart: Update Dependencies

**Feature**: `001-update-pnpm-deps`

## Overview

This feature provides a command to update all project dependencies to their absolute latest versions.

## Usage

### 1. Run the Update

Execute the following command in the terminal:

```bash
pnpm update-deps
```

This will:

1. Fetch the latest versions of all packages.
2. Update `package.json` with the new version numbers.
3. Update `pnpm-lock.yaml`.

### 2. Verify Changes

After the update is complete, verify the project stability:

```bash
# 1. Build the project
pnpm build

# 2. Run Unit Tests
pnpm test

# 3. Run E2E Tests
pnpm test:e2e
```

## Troubleshooting

- **Build Failures**: Check the release notes of major version upgrades for breaking changes.
- **Peer Dependency Warnings**: `pnpm` will warn about unresolved peer dependencies. You may need to manually resolve these if the auto-update creates a conflict.
