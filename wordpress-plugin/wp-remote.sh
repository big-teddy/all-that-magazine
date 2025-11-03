#!/bin/bash

# Remote WordPress Management via WP-CLI over SSH
# Allows automated plugin installation and configuration

set -e

echo "======================================"
echo "Remote WordPress Management"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Load environment variables
if [ -f ../.env.hostinger ]; then
    source ../.env.hostinger
else
    echo -e "${RED}Error: .env.hostinger not found${NC}"
    echo "Please create .env.hostinger with SSH credentials"
    exit 1
fi

# Check if SSH is configured
if [ -z "$HOSTINGER_SSH_HOST" ] || [ -z "$HOSTINGER_SSH_USER" ]; then
    echo -e "${RED}Error: SSH credentials not configured${NC}"
    echo "Add to .env.hostinger:"
    echo "  HOSTINGER_SSH_HOST=your-domain.com"
    echo "  HOSTINGER_SSH_USER=your-ssh-username"
    echo "  HOSTINGER_SSH_PORT=22"
    echo "  HOSTINGER_WP_PATH=/home/username/public_html"
    exit 1
fi

SSH_PORT=${HOSTINGER_SSH_PORT:-22}
WP_PATH=${HOSTINGER_WP_PATH:-/public_html}

# Helper function to run WP-CLI commands
wp_remote() {
    ssh -p $SSH_PORT $HOSTINGER_SSH_USER@$HOSTINGER_SSH_HOST "cd $WP_PATH && wp $@"
}

# Main menu
show_menu() {
    echo ""
    echo -e "${BLUE}What would you like to do?${NC}"
    echo "1. Check WordPress status"
    echo "2. List installed plugins"
    echo "3. Install required plugins (ACF, WPGraphQL, etc.)"
    echo "4. Activate All That Magazine Setup plugin"
    echo "5. Update all plugins"
    echo "6. Flush rewrite rules"
    echo "7. Check site health"
    echo "8. Create database backup"
    echo "9. Custom WP-CLI command"
    echo "0. Exit"
    echo ""
}

# Check WordPress status
check_status() {
    echo -e "${YELLOW}Checking WordPress status...${NC}"
    wp_remote core version
    wp_remote core check-update
    echo -e "${GREEN}✓ WordPress is accessible${NC}"
}

# List plugins
list_plugins() {
    echo -e "${YELLOW}Installed plugins:${NC}"
    wp_remote plugin list
}

# Install required plugins
install_required_plugins() {
    echo -e "${YELLOW}Installing required plugins...${NC}"

    # Advanced Custom Fields
    echo "Installing Advanced Custom Fields..."
    wp_remote plugin install advanced-custom-fields --activate || echo "ACF already installed"

    # WPGraphQL
    echo "Installing WPGraphQL..."
    wp_remote plugin install wp-graphql --activate || echo "WPGraphQL already installed"

    # WPGraphQL for ACF
    echo "Installing WPGraphQL for ACF..."
    wp_remote plugin install https://github.com/wp-graphql/wp-graphql-acf/archive/refs/heads/main.zip --activate || echo "WPGraphQL for ACF already installed"

    # Rank Math SEO
    echo "Installing Rank Math SEO..."
    wp_remote plugin install seo-by-rank-math --activate || echo "Rank Math already installed"

    # Wordfence Security
    echo "Installing Wordfence Security..."
    wp_remote plugin install wordfence --activate || echo "Wordfence already installed"

    echo -e "${GREEN}✓ Required plugins installed${NC}"
}

# Activate our plugin
activate_plugin() {
    echo -e "${YELLOW}Activating All That Magazine Setup plugin...${NC}"
    wp_remote plugin activate all-that-magazine-setup
    echo -e "${GREEN}✓ Plugin activated${NC}"
}

# Update all plugins
update_plugins() {
    echo -e "${YELLOW}Updating all plugins...${NC}"
    wp_remote plugin update --all
    echo -e "${GREEN}✓ Plugins updated${NC}"
}

# Flush rewrite rules
flush_rewrites() {
    echo -e "${YELLOW}Flushing rewrite rules...${NC}"
    wp_remote rewrite flush
    echo -e "${GREEN}✓ Rewrite rules flushed${NC}"
}

# Check site health
check_health() {
    echo -e "${YELLOW}Checking site health...${NC}"
    wp_remote site health
}

# Create backup
create_backup() {
    echo -e "${YELLOW}Creating database backup...${NC}"
    BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).sql"
    wp_remote db export $BACKUP_FILE
    echo -e "${GREEN}✓ Backup created: $BACKUP_FILE${NC}"
    echo "Download with: scp -P $SSH_PORT $HOSTINGER_SSH_USER@$HOSTINGER_SSH_HOST:$WP_PATH/$BACKUP_FILE ."
}

# Custom command
custom_command() {
    read -p "Enter WP-CLI command (without 'wp'): " cmd
    wp_remote $cmd
}

# Main loop
while true; do
    show_menu
    read -p "Choose an option: " choice

    case $choice in
        1) check_status ;;
        2) list_plugins ;;
        3) install_required_plugins ;;
        4) activate_plugin ;;
        5) update_plugins ;;
        6) flush_rewrites ;;
        7) check_health ;;
        8) create_backup ;;
        9) custom_command ;;
        0) echo "Goodbye!"; exit 0 ;;
        *) echo -e "${RED}Invalid option${NC}" ;;
    esac

    echo ""
    read -p "Press Enter to continue..."
done
