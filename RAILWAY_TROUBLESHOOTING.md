# Railway Deployment Troubleshooting

## Common Issues and Solutions

### Issue: Build Fails

**Symptoms:**
- TypeScript compilation errors
- Missing dependencies
- Build timeout

**Solutions:**
1. Ensure all dependencies are in `package.json`
2. Run `npm run build` locally to verify it works
3. Check Railway logs for specific error messages
4. Verify Node.js version compatibility (using Node 20 in nixpacks.toml)

### Issue: Start Command Fails

**Symptoms:**
- Service starts but immediately crashes
- "command not found" errors
- Port binding issues

**Solutions:**
1. The start script uses `npx serve -s dist -l ${PORT:-4173}` to ensure the binary is found
2. PORT environment variable is automatically set by Railway
3. The `-s` flag enables SPA routing (all routes serve index.html)
4. The `-l` flag sets the listen port from PORT env var (with 4173 as fallback)
5. If `serve` command not found, ensure `serve` package is in dependencies (it is: v14.2.1)

### Issue: App Not Loading

**Symptoms:**
- 404 errors on routes
- Blank page
- Assets not loading

**Solutions:**
1. Verify `VITE_API_BASE_URL` is set in Railway environment variables
2. Check that the build completed successfully (dist folder exists)
3. Ensure all routes are handled by React Router (SPA mode)
4. Check browser console for errors

### Issue: Port Configuration

**Symptoms:**
- Service doesn't start
- Connection refused errors

**Solutions:**
1. Railway automatically sets the PORT environment variable
2. The start script uses `${PORT:-4173}` as fallback
3. No need to manually configure ports in Railway

## Verification Steps

1. **Local Build Test:**
   ```bash
   npm run build
   npm run start
   ```

2. **Check Railway Logs:**
   - Go to Railway dashboard
   - Click on your service
   - View "Deployments" tab
   - Check build and runtime logs

3. **Environment Variables:**
   - Verify `VITE_API_BASE_URL` is set
   - Check that it doesn't have trailing slashes
   - Ensure it's accessible from Railway's network

## Current Configuration

- **Node Version:** 20.x (via nixpacks.toml)
- **Build Command:** `npm run build`
- **Start Command:** `npx serve -s dist -l ${PORT:-4173}`
- **Port:** Automatically assigned by Railway

## Debugging Commands

If you need to debug locally with Railway-like environment:

```bash
# Set PORT like Railway does
export PORT=3000

# Build
npm run build

# Start (will use PORT env var)
npm run start
```

