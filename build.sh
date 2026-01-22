#!/bin/bash
set -e

echo "Initializing git submodules..."
git submodule update --init --recursive

echo "Building Hugo site..."
hugo --gc --minify

echo "Build complete!"
