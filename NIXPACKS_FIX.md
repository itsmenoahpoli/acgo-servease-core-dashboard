# Nixpacks Build Fix

## Issue
The build was failing with:
```
error: undefined variable 'nodejs-20_x'
```

## Solution
Updated `nixpacks.toml` to use the correct package name format:
- Changed from: `nodejs-20_x` (invalid)
- Changed to: `nodejs_20` (correct format)

## Alternative Solutions

If `nodejs_20` still doesn't work, you can:

1. **Let Nixpacks auto-detect** (remove nixpacks.toml):
   - Nixpacks will automatically detect Node.js version from:
     - `.node-version` file (created)
     - `package.json` engines field
     - Default to latest LTS

2. **Use engines in package.json**:
   ```json
   "engines": {
     "node": ">=20.0.0"
   }
   ```

3. **Simplified nixpacks.toml** (let it auto-detect):
   ```toml
   [phases.install]
   cmds = ["npm ci"]

   [phases.build]
   cmds = ["npm run build"]

   [start]
   cmd = "npm run start"
   ```

## Current Configuration

- `nixpacks.toml`: Uses `nodejs_20`
- `.node-version`: Specifies Node 20
- Railway will use these to determine Node.js version

