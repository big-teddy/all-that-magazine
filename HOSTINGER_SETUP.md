# Hostinger WordPress Automation Setup

Complete guide to automate WordPress deployment and management on Hostinger.

## 🎯 Overview

This setup enables:
- ✅ Automatic plugin deployment via FTP/SFTP
- ✅ Remote WordPress management via WP-CLI
- ✅ GitHub Actions CI/CD integration
- ✅ One-command plugin updates

## 📋 Prerequisites

1. **Hostinger Account** with WordPress installed
2. **FTP/SFTP Access** credentials
3. **SSH Access** (optional, for WP-CLI)
4. **GitHub Repository** access

## 🔧 Setup Steps

### 1. Get Hostinger Credentials

#### FTP Credentials

1. Login to Hostinger hPanel
2. Go to **Files → FTP Accounts**
3. Note down:
   - FTP Host (e.g., `ftp.your-domain.com`)
   - FTP Username
   - FTP Password
   - FTP Path (usually `/public_html/wp-content/plugins/`)

#### SSH Credentials (Optional)

1. In hPanel, go to **Advanced → SSH Access**
2. Enable SSH access
3. Note down:
   - SSH Host (your domain)
   - SSH Username
   - SSH Port (usually 22)
   - WordPress path (e.g., `/home/u123456789/public_html`)

### 2. Configure Local Environment

Create `.env.hostinger` file in project root:

```bash
cp .env.hostinger.example .env.hostinger
```

Edit `.env.hostinger` with your credentials:

```bash
# FTP
HOSTINGER_FTP_SERVER=ftp.your-domain.com
HOSTINGER_FTP_USERNAME=your-username
HOSTINGER_FTP_PASSWORD=your-password
HOSTINGER_FTP_PATH=/public_html/wp-content/plugins/

# SSH (optional)
HOSTINGER_SSH_HOST=your-domain.com
HOSTINGER_SSH_USER=your-ssh-user
HOSTINGER_SSH_PORT=22
HOSTINGER_WP_PATH=/home/username/public_html
```

**Important**: Add `.env.hostinger` to `.gitignore` (already done)

### 3. Configure GitHub Secrets

For automated deployment via GitHub Actions:

1. Go to GitHub repository → **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add these secrets:

```
HOSTINGER_FTP_SERVER=ftp.your-domain.com
HOSTINGER_FTP_USERNAME=your-username
HOSTINGER_FTP_PASSWORD=your-password
```

## 🚀 Deployment Methods

### Method 1: Manual Deployment (Local)

Deploy plugin to Hostinger via FTP:

```bash
cd wordpress-plugin
./deploy.sh
```

This will:
1. Build the plugin ZIP
2. Extract plugin files
3. Upload to Hostinger via FTP
4. Confirm successful deployment

### Method 2: Automatic Deployment (GitHub Actions)

Automatic deployment on every push to `main`:

```bash
# Edit plugin files
git add wordpress-plugin/
git commit -m "Update WordPress plugin"
git push origin main

# → GitHub Actions automatically:
#    1. Builds plugin
#    2. Deploys to Hostinger via FTP
#    3. Notifies success/failure
```

Check deployment status:
- Go to GitHub repository → **Actions** tab
- View **Deploy WordPress Plugin to Hostinger** workflow

### Method 3: Manual Deployment (Traditional)

1. Build plugin locally:
   ```bash
   cd wordpress-plugin
   ./build.sh
   ```

2. Upload `all-that-magazine-setup.zip` via:
   - Hostinger File Manager
   - WordPress Admin → Plugins → Upload Plugin
   - FTP client (FileZilla, Cyberduck)

## 🛠️ Remote WordPress Management

Manage WordPress remotely via WP-CLI:

```bash
cd wordpress-plugin
./wp-remote.sh
```

**Available operations:**
1. Check WordPress status
2. List installed plugins
3. Install required plugins (ACF, WPGraphQL, etc.)
4. Activate All That Magazine Setup plugin
5. Update all plugins
6. Flush rewrite rules
7. Check site health
8. Create database backup
9. Custom WP-CLI commands

### Prerequisites for WP-CLI

1. **SSH access enabled** on Hostinger
2. **WP-CLI installed** on server (check with `ssh user@host "wp --version"`)
3. If WP-CLI not installed, install it:
   ```bash
   ssh user@host
   curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
   chmod +x wp-cli.phar
   sudo mv wp-cli.phar /usr/local/bin/wp
   ```

## 📊 Deployment Workflow

### Development → Production Flow

```
Local Changes
    ↓
git commit & push
    ↓
GitHub Actions triggered
    ↓
Build plugin
    ↓
Deploy via FTP to Hostinger
    ↓
WordPress plugin updated
    ↓
Notification (success/failure)
```

## 🔒 Security Best Practices

### 1. Protect Credentials

```bash
# Never commit these files:
.env.hostinger          # Local credentials
.env.local             # Frontend credentials

# Already in .gitignore
```

### 2. Use Strong Passwords

- FTP password: 16+ characters, mixed case, numbers, symbols
- WordPress admin: 20+ characters, unique
- SSH key authentication preferred over password

### 3. GitHub Secrets

- Store ALL sensitive credentials as GitHub Secrets
- Never hardcode credentials in workflow files
- Rotate secrets periodically

### 4. FTP Security

- Use SFTP (FTP over SSH) if available
- Enable firewall rules to restrict FTP access
- Use Hostinger's IP whitelist if available

## 🐛 Troubleshooting

### FTP Deployment Fails

**Problem**: Connection timeout or authentication error

**Solutions**:
1. Verify FTP credentials in `.env.hostinger` or GitHub Secrets
2. Check Hostinger hPanel → FTP Accounts for correct hostname
3. Try passive mode: Edit `deploy.sh`, add `set ftp:passive-mode on`
4. Check firewall settings

### SSH Connection Issues

**Problem**: Cannot connect via SSH

**Solutions**:
1. Verify SSH is enabled in Hostinger hPanel
2. Check SSH port (usually 22, sometimes 65002 for shared hosting)
3. Test connection: `ssh -p 22 user@host`
4. Check if WP-CLI is installed: `ssh user@host "wp --version"`

### Plugin Not Showing in WordPress

**Problem**: Plugin deployed but not visible in WordPress admin

**Solutions**:
1. Check FTP path is correct: `/public_html/wp-content/plugins/`
2. Verify plugin folder name: `all-that-magazine-setup`
3. Check file permissions: 755 for folders, 644 for files
4. SSH into server: `ls -la /path/to/wp-content/plugins/`

### GitHub Actions Deployment Fails

**Problem**: Workflow fails during FTP upload

**Solutions**:
1. Check GitHub Secrets are set correctly
2. Review Actions logs for specific error
3. Test FTP credentials locally with `deploy.sh`
4. Verify FTP server allows connections from GitHub IPs

### WP-CLI Commands Not Working

**Problem**: Remote commands fail

**Solutions**:
1. Ensure WP-CLI is installed on server
2. Check WordPress path in `.env.hostinger`
3. Verify SSH user has permissions
4. Test: `ssh user@host "cd /path/to/wp && wp core version"`

## 📈 Monitoring Deployments

### GitHub Actions

Monitor all deployments at:
```
https://github.com/big-teddy/all-that-magazine/actions
```

Filter by workflow:
- **Deploy WordPress Plugin to Hostinger**

### Hostinger

Check deployment results:
1. Login to hPanel
2. Go to **Files → File Manager**
3. Navigate to `/public_html/wp-content/plugins/all-that-magazine-setup/`
4. Verify files are updated (check timestamps)

### WordPress Admin

Verify plugin after deployment:
1. Login to WordPress Admin
2. Go to **Plugins → Installed Plugins**
3. Check **All That Magazine Setup** is present
4. Go to **Settings → All That Setup**
5. Verify plugin version and functionality

## 🔄 Rollback Procedure

If deployment causes issues:

### Method 1: Via GitHub

```bash
git revert HEAD
git push origin main
# → Automatically deploys previous version
```

### Method 2: Manual Rollback

```bash
# Download previous version from GitHub
gh release download v1.0.0

# Upload to Hostinger via FTP
./deploy.sh
```

### Method 3: Via WordPress Admin

1. Deactivate problematic plugin
2. Delete plugin
3. Upload previous version ZIP
4. Activate

## 🎯 Advanced Automation

### Scheduled Plugin Updates

Add to `.github/workflows/deploy-wordpress.yml`:

```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday at midnight
```

### Multi-Environment Deployment

Deploy to staging then production:

```yaml
jobs:
  deploy-staging:
    # Deploy to staging first

  deploy-production:
    needs: deploy-staging
    # Deploy to production after staging success
```

### Backup Before Deployment

Add backup step in workflow:

```yaml
- name: Create backup
  run: |
    ssh user@host "cd /path && wp db export backup-$(date +%Y%m%d).sql"
```

## 📚 Related Documentation

- [AUTOMATION.md](AUTOMATION.md) - Complete automation guide
- [README.md](README.md) - Project overview
- [wordpress-plugin/README.md](wordpress-plugin/all-that-magazine-setup/README.md) - Plugin documentation

## 💡 Tips & Best Practices

### 1. Test Locally First

Always test plugin changes locally before deployment:
```bash
cd wordpress-plugin
./build.sh
# Upload to local WordPress and test
```

### 2. Use Staging Environment

If Hostinger plan allows, create staging subdomain:
- `staging.allthatmagazine.com` → Test deployments
- `allthatmagazine.com` → Production

### 3. Version Control

Tag releases for easy rollback:
```bash
git tag -a v1.0.1 -m "Plugin update"
git push origin v1.0.1
```

### 4. Monitor After Deployment

After each deployment:
- Check WordPress admin
- Test GraphQL endpoint
- Verify frontend still works
- Check for PHP errors in logs

### 5. Backup Regularly

Automate daily backups:
```bash
# Add to cron job
0 0 * * * cd /path && wp db export backup-$(date +%Y%m%d).sql
```

## 🆘 Support

For Hostinger-specific issues:
- **Hostinger Support**: https://www.hostinger.com/support
- **Hostinger Knowledge Base**: https://support.hostinger.com
- **24/7 Live Chat**: Available in hPanel

For project issues:
- **GitHub Issues**: https://github.com/big-teddy/all-that-magazine/issues
- **Documentation**: This file and [AUTOMATION.md](AUTOMATION.md)

---

**All That Magazine** - Fully Automated WordPress Deployment on Hostinger
