# All That Magazine

Premium headless WordPress + Next.js magazine featuring Wellness, Lifestyle, and Tech content.

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
- **Vercel Integration** - Automatic deployments from GitHub
- **npm scripts** - Development workflow
- **WordPress deployment** - Manual or automated via FTP

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

### Frontend (Vercel - Automatic)

Vercel automatically deploys via GitHub Integration:

```bash
git push origin main
# → Vercel automatically builds and deploys
# → No GitHub Actions needed!
```

**Features:**
- Automatic production deploys on `main` branch
- Preview deploys for Pull Requests
- Custom domain support
- Zero configuration

See [VERCEL.md](VERCEL.md) for complete guide.

### WordPress Plugin (Hostinger)

**Manual deployment:**
```bash
npm run deploy:wordpress
```

**Remote management:**
```bash
npm run wp:remote
```

See [HOSTINGER_SETUP.md](HOSTINGER_SETUP.md) for complete guide.

## 📚 Documentation

- **[VERCEL.md](VERCEL.md)** - Vercel deployment guide
- **[HOSTINGER_SETUP.md](HOSTINGER_SETUP.md)** - WordPress deployment & management
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
npm run deploy:wordpress  # Deploy WordPress plugin to Hostinger
npm run wp:remote      # Remote WordPress management
```

### Project Commands

```bash
./setup.sh            # Initial setup
./dev.sh              # Start development
cd wordpress-plugin && ./build.sh  # Build plugin
```

## 🔄 Deployment Workflow

### Vercel (Frontend)

**Automatic via GitHub Integration:**
- Push to `main` → Production deploy
- Create PR → Preview deploy
- Zero configuration needed

**Environment Variables (Vercel Dashboard):**
```
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql
NEXT_PUBLIC_SITE_URL=https://allthatmagazine.com
REVALIDATE_SECRET=your-random-secret
```

### Hostinger (WordPress)

**Manual deployment:**
```bash
npm run deploy:wordpress
```

**Configuration (.env.hostinger):**
```
HOSTINGER_FTP_SERVER=ftp.your-domain.com
HOSTINGER_FTP_USERNAME=your-username
HOSTINGER_FTP_PASSWORD=your-password
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
