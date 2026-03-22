#!/bin/bash
# 💰 PROFIT AWAKEN BOT - Startup Script

echo "╔══════════════════════════════════════════════════════╗"
echo "║     💰 PROFIT AWAKEN BOT - Starting...              ║"
echo "╚══════════════════════════════════════════════════════╝"

cd "$(dirname "$0")"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

echo "✅ Node.js: $(node --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ] && [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create directories
mkdir -p logs data skills

# Run the bot
echo ""
node src/bot.js "$@"
