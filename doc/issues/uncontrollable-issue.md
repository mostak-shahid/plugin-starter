# Uncontrollable / React-Bootstrap Issue

## Problem
The build process fails with errors like:
`Module not found: Error: ENOENT: no such file or directory, open '.../node_modules/uncontrollable/node_modules/@4c/tsconfig/web.json'`

This is a known issue where certain dependencies of `uncontrollable` are not correctly installed or resolved when `uncontrollable` is used as a dependency, particularly in `react-bootstrap`. The build process expects to find files that should be part of the package but are missing, likely due to how `npm` handles dependency hoisting or `devDependencies` installation in the environment.

## Why this happens again
This issue often reappears when `node_modules` is re-installed or when the dependency tree changes. If the build environment (specifically `npm` or the local filesystem) fails to correctly resolve the nested `node_modules/@4c/tsconfig` directory required by `uncontrollable`, the build will fail.

## How to solve it
1.  **Ensure a clean state:**
    `rm -rf node_modules package-lock.json && npm install`

2.  **Verify dependencies:**
    If the issue persists, the `@4c/tsconfig` package might not be correctly installed. You can manually ensure it is present by installing it:
    `npm install --save-dev @4c/tsconfig`

3.  **Workaround (Manual Copy):**
    If the above steps fail (which they might in certain restricted environments), you can manually copy the missing directory structure:
    `mkdir -p node_modules/@4c`
    `npm install @4c/tsconfig --prefix /tmp/fix`
    `cp -r /tmp/fix/node_modules/@4c/tsconfig node_modules/@4c/tsconfig`

4.  **Check for build tool issues:**
    Ensure `@wordpress/scripts` is correctly installed. If `npm run build` fails with `sh: 1: wp-scripts: not found`, run:
    `npm install @wordpress/scripts --save-dev`
