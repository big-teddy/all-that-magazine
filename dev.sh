#!/bin/bash

# Development Server Launcher
# Automatically starts the frontend development server

set -e

echo "======================================"
echo "All That Magazine - Dev Server"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f frontend/.env.local ]; then
    echo "⚠️  .env.local not found!"
    echo ""
    echo "Creating .env.local from example..."
    cp frontend/.env.local.example frontend/.env.local
    echo ""
    echo "✓ Created frontend/.env.local"
    echo ""
    echo "Please edit frontend/.env.local with your WordPress GraphQL endpoint:"
    echo "  WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql"
    echo ""
    read -p "Press Enter after editing .env.local to continue..."
fi

# Check if node_modules exists
if [ ! -d frontend/node_modules ]; then
    echo "Installing dependencies..."
    cd frontend
    npm install
    cd ..
    echo "✓ Dependencies installed"
    echo ""
fi

# Start dev server
echo "Starting development server..."
echo "Open http://localhost:3000 in your browser"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd frontend
npm run dev
