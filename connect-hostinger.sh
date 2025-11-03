#!/bin/bash

# Interactive Hostinger Connection Setup
# Helps you connect All That Magazine to Hostinger

set -e

echo "========================================"
echo "All That Magazine"
echo "Hostinger Connection Setup"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if .env.hostinger exists
if [ -f .env.hostinger ]; then
    print_warning ".env.hostinger already exists!"
    read -p "Do you want to overwrite it? (y/N): " overwrite
    if [[ $overwrite != [yY] ]]; then
        echo "Keeping existing configuration."
        exit 0
    fi
fi

echo ""
echo "This wizard will help you connect to Hostinger."
echo "You'll need information from Hostinger hPanel."
echo ""
read -p "Press Enter to continue..."

# Step 1: WordPress URL
echo ""
echo "========================================"
echo "Step 1: WordPress Information"
echo "========================================"
echo ""
print_info "What is your WordPress URL?"
echo "Examples:"
echo "  - https://wp.allthatmagazine.com"
echo "  - https://allthatmagazine.com/wp"
echo "  - https://your-domain.com"
echo ""
read -p "WordPress URL: " wp_url

# Validate URL
if [[ ! $wp_url =~ ^https?:// ]]; then
    wp_url="https://$wp_url"
fi

print_success "WordPress URL: $wp_url"

# Test WordPress accessibility
echo ""
print_info "Testing WordPress connection..."
if curl -s -o /dev/null -w "%{http_code}" "$wp_url" | grep -q "200\|301\|302"; then
    print_success "WordPress is accessible!"
else
    print_warning "Could not reach WordPress URL. Please verify the URL is correct."
    read -p "Continue anyway? (y/N): " continue_anyway
    if [[ $continue_anyway != [yY] ]]; then
        exit 1
    fi
fi

# Step 2: FTP Information
echo ""
echo "========================================"
echo "Step 2: FTP Information"
echo "========================================"
echo ""
print_info "Get FTP information from:"
echo "  Hostinger hPanel → Files → FTP Accounts"
echo ""

read -p "FTP Server (e.g., ftp.your-domain.com): " ftp_server
read -p "FTP Username (e.g., u123456789): " ftp_user
read -sp "FTP Password: " ftp_pass
echo ""

print_success "FTP credentials collected"

# Step 3: WordPress Path
echo ""
echo "========================================"
echo "Step 3: WordPress Installation Path"
echo "========================================"
echo ""
print_info "Where is WordPress installed on your server?"
echo "Common paths:"
echo "  - /public_html/wp-content/plugins/"
echo "  - /public_html/"
echo "  - /domains/your-domain.com/public_html/"
echo ""
read -p "WordPress plugins path: " wp_path

# Default path if empty
if [ -z "$wp_path" ]; then
    wp_path="/public_html/wp-content/plugins/"
    print_info "Using default: $wp_path"
fi

# Step 4: SSH (Optional)
echo ""
echo "========================================"
echo "Step 4: SSH Information (Optional)"
echo "========================================"
echo ""
print_info "SSH is needed for WP-CLI remote management."
echo "Skip this if you don't have SSH access."
echo ""
read -p "Do you have SSH access? (y/N): " has_ssh

if [[ $has_ssh == [yY] ]]; then
    read -p "SSH Host (usually same as domain): " ssh_host
    read -p "SSH Username: " ssh_user
    read -p "SSH Port (usually 22 or 21098): " ssh_port

    # Default SSH port
    if [ -z "$ssh_port" ]; then
        ssh_port="22"
    fi

    read -p "WordPress absolute path (e.g., /home/u123456789/public_html): " ssh_wp_path

    print_success "SSH credentials collected"
else
    print_info "Skipping SSH configuration"
    ssh_host=""
    ssh_user=""
    ssh_port=""
    ssh_wp_path=""
fi

# Step 5: Create .env.hostinger
echo ""
echo "========================================"
echo "Step 5: Creating Configuration"
echo "========================================"
echo ""

cat > .env.hostinger << EOF
# Hostinger FTP Credentials
HOSTINGER_FTP_SERVER=$ftp_server
HOSTINGER_FTP_USERNAME=$ftp_user
HOSTINGER_FTP_PASSWORD=$ftp_pass
HOSTINGER_FTP_PATH=$wp_path

# WordPress URL
HOSTINGER_WP_URL=$wp_url

EOF

if [ -n "$ssh_host" ]; then
    cat >> .env.hostinger << EOF
# Hostinger SSH Credentials (for WP-CLI)
HOSTINGER_SSH_HOST=$ssh_host
HOSTINGER_SSH_USER=$ssh_user
HOSTINGER_SSH_PORT=$ssh_port
HOSTINGER_WP_PATH=$ssh_wp_path
EOF
fi

chmod 600 .env.hostinger
print_success ".env.hostinger created!"

# Step 6: Test FTP Connection
echo ""
echo "========================================"
echo "Step 6: Testing FTP Connection"
echo "========================================"
echo ""

read -p "Test FTP connection now? (Y/n): " test_ftp
if [[ $test_ftp != [nN] ]]; then
    print_info "Testing FTP connection..."

    # Try to connect with lftp if available
    if command -v lftp &> /dev/null; then
        if lftp -c "open -u $ftp_user,$ftp_pass $ftp_server; ls" &> /dev/null; then
            print_success "FTP connection successful!"
        else
            print_error "FTP connection failed. Please check credentials."
            print_info "You can manually edit .env.hostinger later"
        fi
    else
        print_warning "lftp not installed. Skipping FTP test."
        print_info "Install with: brew install lftp (macOS) or sudo apt install lftp (Linux)"
    fi
fi

# Step 7: Frontend Configuration
echo ""
echo "========================================"
echo "Step 7: Frontend Configuration"
echo "========================================"
echo ""

graphql_endpoint="${wp_url}/graphql"
print_info "GraphQL Endpoint: $graphql_endpoint"
echo ""

if [ ! -f frontend/.env.local ]; then
    print_info "Creating frontend/.env.local..."

    # Generate random secret
    if command -v openssl &> /dev/null; then
        revalidate_secret=$(openssl rand -base64 32)
    else
        revalidate_secret="change-this-to-a-random-string"
    fi

    cat > frontend/.env.local << EOF
# WordPress GraphQL Endpoint
WORDPRESS_GRAPHQL_ENDPOINT=$graphql_endpoint

# Site URL (for local development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Revalidation Secret (for on-demand ISR)
REVALIDATE_SECRET=$revalidate_secret
EOF

    print_success "frontend/.env.local created!"
else
    print_warning "frontend/.env.local already exists"
    print_info "Update it manually with: WORDPRESS_GRAPHQL_ENDPOINT=$graphql_endpoint"
fi

# Summary
echo ""
echo "========================================"
echo "✓ Configuration Complete!"
echo "========================================"
echo ""
echo "Configuration saved to:"
echo "  - .env.hostinger (Hostinger credentials)"
echo "  - frontend/.env.local (Frontend config)"
echo ""
echo "Next steps:"
echo ""
echo "1. Build WordPress plugin:"
echo "   npm run build:plugin"
echo ""
echo "2. Upload plugin to WordPress:"
echo "   - Go to: $wp_url/wp-admin"
echo "   - Plugins → Add New → Upload Plugin"
echo "   - Upload: wordpress-plugin/all-that-magazine-setup.zip"
echo ""
echo "   Or deploy via FTP:"
echo "   npm run deploy:wordpress"
echo ""
echo "3. Install required plugins in WordPress:"
echo "   - Advanced Custom Fields"
echo "   - WPGraphQL"
echo "   - WPGraphQL for ACF"
echo ""
echo "4. Run setup in WordPress:"
echo "   - Settings → All That Setup"
echo "   - Click 'Run Complete Setup'"
echo ""
echo "5. Test GraphQL endpoint:"
echo "   - Go to: $wp_url/wp-admin/admin.php?page=graphiql-ide"
echo ""
echo "6. Start development server:"
echo "   npm run dev"
echo ""
echo "7. Open: http://localhost:3000"
echo ""
print_success "All That Magazine is ready to connect!"
echo ""
echo "For detailed instructions, see:"
echo "  - QUICKSTART.md"
echo "  - HOSTINGER_SETUP.md"
echo ""
