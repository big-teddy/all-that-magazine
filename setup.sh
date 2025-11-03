#!/bin/bash

# All That Magazine - Automated Setup Script
# This script automates the entire development environment setup

set -e  # Exit on error

echo "======================================"
echo "All That Magazine - Automated Setup"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi
print_success "Node.js $(node --version) found"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi
print_success "npm $(npm --version) found"

# Check git
if ! command -v git &> /dev/null; then
    print_error "git is not installed."
    exit 1
fi
print_success "git found"

echo ""
echo "======================================"
echo "Step 1: Frontend Setup"
echo "======================================"

cd frontend

# Install dependencies
print_info "Installing frontend dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    print_info "Creating .env.local file..."
    cp .env.local.example .env.local
    print_success ".env.local created from example"
    echo ""
    print_info "Please edit frontend/.env.local with your WordPress GraphQL endpoint"
else
    print_success ".env.local already exists"
fi

# Build frontend
print_info "Building frontend..."
npm run build

print_success "Frontend setup complete!"

cd ..

echo ""
echo "======================================"
echo "Step 2: WordPress Plugin Packaging"
echo "======================================"

cd wordpress-plugin

# Create zip file for WordPress plugin
print_info "Creating WordPress plugin zip file..."
if command -v zip &> /dev/null; then
    zip -r all-that-magazine-setup.zip all-that-magazine-setup -x "*.DS_Store"
    print_success "Plugin zip created: wordpress-plugin/all-that-magazine-setup.zip"
else
    print_info "zip command not found. Plugin directory ready at wordpress-plugin/all-that-magazine-setup/"
fi

cd ..

echo ""
echo "======================================"
echo "Setup Complete! 🎉"
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "1. WordPress Backend:"
echo "   - Upload wordpress-plugin/all-that-magazine-setup.zip to WordPress"
echo "   - Install required plugins: ACF, WPGraphQL, WPGraphQL for ACF"
echo "   - Go to Settings → All That Setup → Run Complete Setup"
echo ""
echo "2. Frontend Development:"
echo "   - Edit frontend/.env.local with your WordPress GraphQL endpoint"
echo "   - Run: cd frontend && npm run dev"
echo "   - Open: http://localhost:3000"
echo ""
echo "3. Documentation:"
echo "   - Main README: README.md"
echo "   - Frontend README: frontend/README.md"
echo "   - WordPress Plugin README: wordpress-plugin/all-that-magazine-setup/README.md"
echo ""
print_success "All That Magazine is ready to go!"
