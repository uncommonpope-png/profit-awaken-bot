#!/bin/bash
# 🚀 DEPLOY PROFIT AWAKEN BOT
# Deploy to any platform

set -e

echo "💰 Deploying Profit Awaken Bot..."

# Detect platform
PLATFORM=$(uname -s)
echo "📱 Detected platform: $PLATFORM"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create production config
cat > config/production.json << 'EOF'
{
  "profit": {
    "trackingEnabled": true,
    "goals": {
      "daily": 100,
      "weekly": 700,
      "monthly": 3000
    }
  },
  "automation": {
    "checkInterval": 60000,
    "proactiveMode": true
  },
  "production": true
}
EOF

# Set permissions
chmod +x start.sh src/bot.js

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Commands:"
echo "  ./start.sh start    - Start Profit Awaken Bot"
echo "  ./start.sh status   - Check status"
echo "  ./start.sh skills   - List skills"
echo "  ./start.sh run      - Run profit task"
echo ""
