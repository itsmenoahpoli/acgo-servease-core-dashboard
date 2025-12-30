# Railway Deployment Guide

This project is configured for deployment on Railway.

## Configuration Files

- `railway.json` - Railway-specific configuration
- `nixpacks.toml` - Build configuration for Railway
- `package.json` - Contains build and start scripts

## Build Process

1. **Install Dependencies**: `npm ci`
2. **Build Application**: `npm run build`
3. **Start Server**: `npm run start` (serves static files from `dist/`)

## Environment Variables

Set these in your Railway project settings:

- `VITE_API_BASE_URL` - Your backend API URL (e.g., `https://api.example.com`)

## Deployment Steps

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the project
3. Set the environment variable `VITE_API_BASE_URL`
4. Deploy!

## Build Configuration

- **Builder**: Nixpacks (auto-detected)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: Automatically assigned by Railway (via `PORT` env var)

## Static File Serving

The app uses `serve` (via `npx`) to serve the built static files from the `dist/` directory. This is configured to:
- Serve the SPA with proper routing support (`-s` flag)
- Automatically listen on the port provided by Railway via `PORT` environment variable (`-l ${PORT:-4173}`)
- Handle client-side routing correctly (all routes serve index.html)
- Uses `npx` to ensure the serve binary is found even if not globally installed

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation passes (`tsc`)

### App Not Loading
- Verify `VITE_API_BASE_URL` is set correctly
- Check Railway logs for errors
- Ensure the build completed successfully

### Routing Issues
- The `serve` package is configured with `-s` flag for SPA routing
- All routes should be handled by the React Router

