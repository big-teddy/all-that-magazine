#!/bin/bash

# WordPress Plugin Deployment Script
# Deploys plugin to Hostinger via FTP/SFTP

set -e

echo "======================================"
echo "WordPress Plugin Deployment"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Load environment variables
if [ -f ../.env.hostinger ]; then
    source ../.env.hostinger
else
    echo -e "${RED}Error: .env.hostinger not found${NC}"
    echo "Please create .env.hostinger with:"
    echo "  HOSTINGER_HOST=your-ftp-host"
    echo "  HOSTINGER_USER=your-ftp-username"
    echo "  HOSTINGER_PASS=your-ftp-password"
    echo "  HOSTINGER_PATH=/public_html/wp-content/plugins/"
    exit 1
fi

# Check if required tools are installed
if ! command -v lftp &> /dev/null; then
    echo -e "${YELLOW}lftp not found. Installing...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install lftp
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install lftp -y
    else
        echo -e "${RED}Please install lftp manually${NC}"
        exit 1
    fi
fi

# Build plugin first
echo -e "${YELLOW}Building plugin...${NC}"
./build.sh

PLUGIN_DIR="all-that-magazine-setup"
LOCAL_PATH="$(pwd)/$PLUGIN_DIR"
REMOTE_PATH="${HOSTINGER_PATH}${PLUGIN_DIR}"

echo ""
echo "Deployment Configuration:"
echo "  Host: $HOSTINGER_HOST"
echo "  User: $HOSTINGER_USER"
echo "  Local: $LOCAL_PATH"
echo "  Remote: $REMOTE_PATH"
echo ""

read -p "Continue with deployment? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "Deployment cancelled"
    exit 0
fi

echo ""
echo -e "${YELLOW}Uploading to Hostinger...${NC}"

# Deploy using lftp
lftp -c "
set ftp:ssl-allow no;
set ftp:passive-mode on;
open -u $HOSTINGER_USER,$HOSTINGER_PASS $HOSTINGER_HOST;
mirror --reverse --delete --verbose --exclude .git/ --exclude .DS_Store $LOCAL_PATH $REMOTE_PATH;
bye
"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}======================================"
    echo "Deployment Successful! ✅"
    echo "======================================${NC}"
    echo ""
    echo "Plugin deployed to: $REMOTE_PATH"
    echo ""
    echo "Next steps:"
    echo "1. Go to WordPress Admin → Plugins"
    echo "2. Activate 'All That Magazine Setup' if not already active"
    echo "3. Go to Settings → All That Setup"
    echo "4. Verify plugin is working correctly"
else
    echo ""
    echo -e "${RED}======================================"
    echo "Deployment Failed! ❌"
    echo "======================================${NC}"
    exit 1
fi
