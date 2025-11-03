# All That Magazine

Premium headless WordPress + Next.js magazine featuring Wellness, Lifestyle, and Tech content.

[![Frontend CI/CD](https://github.com/big-teddy/all-that-magazine/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/big-teddy/all-that-magazine/actions/workflows/frontend-ci.yml)
[![WordPress Plugin Build](https://github.com/big-teddy/all-that-magazine/actions/workflows/wordpress-plugin-build.yml/badge.svg)](https://github.com/big-teddy/all-that-magazine/actions/workflows/wordpress-plugin-build.yml)

## 🚀 Quick Start

### One-Command Setup

```bash
npm run setup
```

### Start Development

```bash
npm run dev
```

That's it! 🎉

## 📋 Features

### Content
- 🧘 **Wellness** - Mental health, fitness, nutrition
- 🎨 **Lifestyle** - Culture, travel, trends
- 💻 **Tech** - Wearables, apps, AI

### Technology
- ✅ **Headless CMS** - WordPress with WPGraphQL
- ✅ **Modern Frontend** - Next.js 14 App Router
- ✅ **Type Safety** - TypeScript strict mode
- ✅ **Design System** - Tailwind CSS with Bold Minimalism
- ✅ **Performance** - ISR, image optimization, SSG
- ✅ **CI/CD** - Automated testing and deployment
- ✅ **Mobile First** - Responsive design

## 🏗️ Project Structure

```
all-that-magazine/
├── wordpress-plugin/           # WordPress backend setup
│   └── all-that-magazine-setup/
├── frontend/                   # Next.js frontend
│   ├── app/                   # Pages & routes
│   ├── components/            # React components
│   └── lib/                   # Utilities & GraphQL
├── .github/workflows/         # CI/CD automation
├── setup.sh                   # Automated setup
└── dev.sh                     # Dev server launcher
```

## 🛠️ Tech Stack

### Backend
- **WordPress 6.4+** - Headless CMS
- **WPGraphQL** - GraphQL API
- **Advanced Custom Fields** - Content structure
- **Hostinger Premium** - Hosting

### Frontend
- **Next.js 14** - App Router, TypeScript
- **Tailwind CSS** - Bold Minimalism design
- **GraphQL Request** - API client
- **Vercel** - Deployment & hosting

### Automation
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Automatic deployments
- **npm scripts** - Development workflow

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- WordPress installation
- Git

### Setup Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/big-teddy/all-that-magazine.git
   cd all-that-magazine
   ```

2. **Run Setup**
   ```bash
   npm run setup
   ```

3. **Configure WordPress**
   - Upload `wordpress-plugin/all-that-magazine-setup.zip` to WordPress
   - Install required plugins: ACF, WPGraphQL, WPGraphQL for ACF
   - Go to Settings → All That Setup → Run Complete Setup

4. **Configure Frontend**
   ```bash
   cd frontend
   # Edit .env.local with your WordPress GraphQL endpoint
   npm run dev
   ```

## 🚢 Deployment

### Automatic (Recommended)

Push to `main` branch → GitHub Actions → Vercel Production

```bash
git push origin main
```

### Manual

```bash
# Build everything
npm run build

# Deploy frontend to Vercel
cd frontend
npx vercel --prod
```

## 📚 Documentation

- **[AUTOMATION.md](AUTOMATION.md)** - Complete automation guide
- **[frontend/README.md](frontend/README.md)** - Frontend documentation
- **[wordpress-plugin/README.md](wordpress-plugin/all-that-magazine-setup/README.md)** - Plugin documentation

## 🎨 Design System

### Typography
- **Headlines**: Playfair Display (900)
- **Body**: Inter (400)
- **Scale**: Perfect Fourth (1.333 ratio)

### Colors
| Vertical | Color | Hex |
|----------|-------|-----|
| Wellness | Green | `#4CAF50` |
| Lifestyle | Purple | `#9C27B0` |
| Tech | Blue | `#2196F3` |

### Layout Principles
- 60% white space
- 30% content
- 10% accent colors
- Mobile-first responsive

## 🧪 Development

### Available Scripts

```bash
npm run dev            # Start dev server
npm run build          # Build everything
npm run build:frontend # Build Next.js only
npm run build:plugin   # Build WordPress plugin only
npm start             # Start production server
npm run lint          # Run linter
npm run clean         # Clean build artifacts
```

### Project Commands

```bash
./setup.sh            # Initial setup
./dev.sh              # Start development
cd wordpress-plugin && ./build.sh  # Build plugin
```

## 🔄 CI/CD

### Automated Workflows

**Frontend CI/CD** (`.github/workflows/frontend-ci.yml`)
- ✅ Lint & type check
- ✅ Build test
- ✅ Deploy preview (PRs)
- ✅ Deploy production (main branch)

**WordPress Plugin Build** (`.github/workflows/wordpress-plugin-build.yml`)
- ✅ Create plugin ZIP
- ✅ Upload artifacts
- ✅ Attach to releases

### GitHub Secrets Required

```
WORDPRESS_GRAPHQL_ENDPOINT
NEXT_PUBLIC_SITE_URL
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
REVALIDATE_SECRET
```

## 🎯 Roadmap

### Phase 1: MVP (Week 1-12) ✅
- [x] WordPress backend setup
- [x] Next.js frontend
- [x] GraphQL integration
- [x] Design system
- [x] CI/CD automation

### Phase 2: Membership (Week 8-9)
- [ ] NextAuth.js integration
- [ ] Payment flows (Kakao Pay, Naver Pay)
- [ ] Membership tiers
- [ ] Paywall system

### Phase 3: Enhancement (Month 2-3)
- [ ] Comment system
- [ ] Search functionality
- [ ] Newsletter automation
- [ ] Author pages

### Phase 4: Growth (Month 4-6)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Member dashboard
- [ ] 4th vertical

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

GPL v2 or later

## 🔗 Links

- **GitHub**: https://github.com/big-teddy/all-that-magazine
- **Issues**: https://github.com/big-teddy/all-that-magazine/issues
- **Documentation**: See [AUTOMATION.md](AUTOMATION.md)

## 💡 Support

For support and questions:
1. Check [AUTOMATION.md](AUTOMATION.md) for troubleshooting
2. Review documentation in each directory
3. Open an issue on GitHub

---

**All That Magazine** - Premium Wellness Lifestyle Tech

Built with ❤️ using WordPress + Next.js
