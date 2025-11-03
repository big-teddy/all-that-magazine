#!/bin/bash

# WordPress Plugin Build Script
# Automatically creates a production-ready zip file

set -e

echo "Building All That Magazine WordPress Plugin..."

PLUGIN_DIR="all-that-magazine-setup"
ZIP_FILE="all-that-magazine-setup.zip"
BUILD_DIR="build"

# Clean previous builds
if [ -f "$ZIP_FILE" ]; then
    rm "$ZIP_FILE"
    echo "✓ Removed old zip file"
fi

if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
    echo "✓ Removed old build directory"
fi

# Create build directory
mkdir -p "$BUILD_DIR"
echo "✓ Created build directory"

# Copy plugin files to build directory
cp -r "$PLUGIN_DIR" "$BUILD_DIR/"
echo "✓ Copied plugin files"

# Remove unnecessary files
find "$BUILD_DIR" -name ".DS_Store" -type f -delete
find "$BUILD_DIR" -name "*.bak" -type f -delete
find "$BUILD_DIR" -name "*.tmp" -type f -delete
echo "✓ Cleaned temporary files"

# Create zip file
cd "$BUILD_DIR"
zip -r "../$ZIP_FILE" "$PLUGIN_DIR"
cd ..

# Clean build directory
rm -rf "$BUILD_DIR"
echo "✓ Cleaned build directory"

echo ""
echo "======================================"
echo "Build Complete! 🎉"
echo "======================================"
echo ""
echo "Plugin package: $ZIP_FILE"
echo "Size: $(du -h "$ZIP_FILE" | cut -f1)"
echo ""
echo "Upload this file to WordPress:"
echo "  Plugins → Add New → Upload Plugin"
echo ""
