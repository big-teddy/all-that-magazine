# All That Magazine - Automation Guide

Complete automation setup for development, build, and deployment.

## Quick Start

### One-Command Setup

```bash
npm run setup
```

This will:
- Install all frontend dependencies
- Create `.env.local` from example
- Build the frontend
- Package WordPress plugin as ZIP

### Start Development Server

```bash
npm run dev
```

Opens development server at http://localhost:3000

## Available Scripts

### Root Level (`package.json`)

```bash
npm run dev           # Start development server
npm run setup         # Initial project setup
npm run build         # Build both frontend and plugin
npm run build:frontend # Build Next.js frontend only
npm run build:plugin  # Build WordPress plugin ZIP only
npm start            # Start production server
npm run lint         # Run ESLint on frontend
npm run clean        # Clean all build artifacts
```

### Manual Scripts

#### Setup Everything
```bash
./setup.sh
```

#### Start Dev Server
```bash
./dev.sh
```

#### Build WordPress Plugin
```bash
cd wordpress-plugin
./build.sh
```

## CI/CD Automation (GitHub Actions)

### Frontend CI/CD (`.github/workflows/frontend-ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches (only when `frontend/**` changes)
- Pull requests to `main` or `develop`

**Jobs:**

1. **Test and Build**
   - Runs on Node.js 18.x and 20.x
   - Installs dependencies
   - Runs linter
   - Type checks with TypeScript
   - Builds Next.js app
   - Uploads build artifacts

2. **Deploy Preview** (Pull Requests)
   - Automatically deploys to Vercel preview URL
   - Comments PR with preview link

3. **Deploy Production** (Main Branch)
   - Deploys to Vercel production
   - Updates live site

### WordPress Plugin Build (`.github/workflows/wordpress-plugin-build.yml`)

**Triggers:**
- Push to `main` branch (only when `wordpress-plugin/**` changes)
- GitHub releases

**Jobs:**
- Creates plugin ZIP file
- Uploads as GitHub artifact (30 day retention)
- Attaches to GitHub releases

## Vercel Deployment

### Automatic Deployment

Vercel automatically deploys when:
- Code is pushed to `main` branch (production)
- Pull requests are created (preview)

### Manual Deployment

```bash
cd frontend
npx vercel          # Deploy to preview
npx vercel --prod   # Deploy to production
```

### Environment Variables

Set these in Vercel dashboard:

```
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql
NEXT_PUBLIC_SITE_URL=https://allthatmagazine.com
REVALIDATE_SECRET=your-secret-key
```

## GitHub Secrets

For CI/CD to work, set these secrets in GitHub repository settings:

### Required Secrets

```
WORDPRESS_GRAPHQL_ENDPOINT  # WordPress GraphQL API endpoint
NEXT_PUBLIC_SITE_URL        # Production site URL
VERCEL_TOKEN                # Vercel authentication token
VERCEL_ORG_ID               # Vercel organization ID
VERCEL_PROJECT_ID           # Vercel project ID
```

### How to Get Vercel Tokens

1. **VERCEL_TOKEN**:
   ```bash
   npx vercel login
   npx vercel token create
   ```

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
   ```bash
   cd frontend
   npx vercel link
   # Check .vercel/project.json for IDs
   ```

## Workflow Examples

### New Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-component

# 2. Make changes
# ... edit files ...

# 3. Test locally
npm run dev

# 4. Lint and build
npm run lint
npm run build

# 5. Commit and push
git add .
git commit -m "Add new component"
git push origin feature/new-component

# 6. Create PR on GitHub
# → CI/CD automatically tests and deploys preview
```

### WordPress Plugin Update

```bash
# 1. Edit plugin files in wordpress-plugin/all-that-magazine-setup/

# 2. Build plugin
npm run build:plugin

# 3. Test manually by uploading to WordPress

# 4. Commit and push
git add wordpress-plugin
git commit -m "Update WordPress plugin"
git push

# 5. Create GitHub release
gh release create v1.0.1 wordpress-plugin/all-that-magazine-setup.zip
# → Plugin ZIP automatically attached to release
```

### Production Deployment

```bash
# 1. Merge PR to main
git checkout main
git pull

# 2. CI/CD automatically:
#    - Runs tests
#    - Builds frontend
#    - Deploys to Vercel production
#    - Builds WordPress plugin

# 3. Monitor deployment
# Check GitHub Actions tab
# Check Vercel dashboard
```

## File Structure

```
all-that-magazine/
├── .github/
│   └── workflows/
│       ├── frontend-ci.yml           # Frontend CI/CD
│       └── wordpress-plugin-build.yml # Plugin build automation
├── frontend/                          # Next.js frontend
├── wordpress-plugin/                  # WordPress plugin
│   └── build.sh                      # Plugin build script
├── setup.sh                          # Initial setup script
├── dev.sh                            # Dev server script
├── package.json                      # Root npm scripts
├── vercel.json                       # Vercel configuration
└── AUTOMATION.md                     # This file
```

## Troubleshooting

### Setup Issues

**Problem**: `npm run setup` fails
**Solution**:
```bash
# Check Node.js version
node --version  # Should be 18+

# Manually run steps
cd frontend
npm install
cp .env.local.example .env.local
npm run build
```

### CI/CD Issues

**Problem**: GitHub Actions failing
**Solution**:
1. Check GitHub Secrets are set correctly
2. Review Actions logs for specific error
3. Test locally first: `npm run build`

**Problem**: Vercel deployment failing
**Solution**:
1. Check Vercel environment variables
2. Verify WordPress GraphQL endpoint is accessible
3. Check build logs in Vercel dashboard

### Build Issues

**Problem**: Frontend build fails
**Solution**:
```bash
cd frontend
npm ci           # Clean install
rm -rf .next     # Remove build cache
npm run build
```

**Problem**: WordPress plugin ZIP not created
**Solution**:
```bash
# Install zip command
# macOS: already installed
# Linux: sudo apt-get install zip

cd wordpress-plugin
chmod +x build.sh
./build.sh
```

## Performance Optimization

### Automatic Optimizations

- **Image Optimization**: Next.js automatically optimizes images
- **Code Splitting**: Automatic with Next.js App Router
- **Font Optimization**: next/font/google preloads fonts
- **CSS Optimization**: Tailwind CSS purges unused styles

### ISR (Incremental Static Regeneration)

Pages revalidate every 60 seconds:
- Homepage: Latest articles
- Vertical pages: Category articles
- Article pages: Full content

### Cache Invalidation

Manually revalidate pages:
```bash
curl -X POST 'https://allthatmagazine.com/api/revalidate?secret=YOUR_SECRET&path=/'
```

## Monitoring

### GitHub Actions

Monitor builds at:
```
https://github.com/big-teddy/all-that-magazine/actions
```

### Vercel Dashboard

Monitor deployments at:
```
https://vercel.com/dashboard
```

### WordPress Health

Check GraphQL endpoint:
```bash
curl -X POST https://wp.allthatmagazine.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ articles(first:1) { edges { node { title } } } }"}'
```

## Security

### Automated Security Checks

- Dependabot for dependency updates
- GitHub secret scanning
- Vercel automatic HTTPS
- Security headers in `vercel.json`

### Best Practices

- Never commit `.env.local` or secrets
- Use GitHub Secrets for sensitive data
- Rotate Vercel tokens regularly
- Keep WordPress plugins updated

## Future Enhancements

Planned automation improvements:

- [ ] Automated testing (Jest, React Testing Library)
- [ ] Visual regression testing (Percy, Chromatic)
- [ ] Performance monitoring (Lighthouse CI)
- [ ] Automated dependency updates (Dependabot)
- [ ] Database backups automation
- [ ] Content migration scripts
- [ ] SEO auditing automation

---

**All That Magazine** - Fully Automated Development & Deployment
