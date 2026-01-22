# Cloudflare Pages Build Configuration

## Build Settings

**Build command:** `chmod +x build.sh && ./build.sh`
**Build output directory:** `public`
**Root directory:** `/`

## Environment Variables

Set these in Cloudflare Pages dashboard:
- `HUGO_VERSION=0.121.0`
- `NODE_VERSION=18`
- `HUGO_ENV=production`

## Important Notes

⚠️ **Git Submodules:** This repository uses a git submodule for the Hugo theme (`themes/hugo-product-launch`). Cloudflare Pages does **not** automatically initialize submodules, so the build script (`build.sh`) includes the command `git submodule update --init --recursive` before running Hugo.

Without this step, the build will fail with "theme not found" error.

## Configuration Steps

1. Go to Workers & Pages → Your site → Settings → Builds & deployments
2. Set Build command: `chmod +x build.sh && ./build.sh`
3. Set Build output directory: `public`
4. Add environment variables as listed above

## Build Script

The `build.sh` script performs these steps:
1. Initialize git submodules (`git submodule update --init --recursive`)
2. Build the Hugo site (`hugo --gc --minify`)

This ensures the theme is available before Hugo attempts to build the site.
