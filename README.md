# 💰 Profit Awaken Bot

> Autonomous profit-generating AI agent powered by ForgeClaw skills + OpenClaw ecosystem

## 🚀 Quick Start

```bash
# Start the bot
./start.sh start

# Or with Node.js directly
node src/bot.js start
```

## 📦 Commands

| Command | Description |
|---------|-------------|
| `start` | Start the bot |
| `status` | Show bot status and profit tracking |
| `skills` | List all 52 loaded ForgeClaw skills |
| `run` | Run example profit task |
| `execute <skill> <action>` | Execute a specific skill |

## 🔧 Loaded Skills (52 Total)

### Communication
- **discord** - Discord operations
- **slack** - Slack messaging
- **wacli** - WhatsApp CLI
- **imsg** - iMessage
- **bluebubbles** - BlueBubbles iMessage

### Productivity
- **notion** - Notion workspace
- **obsidian** - Obsidian vault
- **trello** - Trello boards
- **apple-notes** - Apple Notes
- **apple-reminders** - Apple Reminders
- **bear-notes** - Bear notes

### Development
- **github** - GitHub operations
- **gh-issues** - GitHub issues
- **coding-agent** - Code delegation
- **tmux** - Terminal multiplexer
- **skill-creator** - Skill creation

### AI/ML
- **gemini** - Google Gemini
- **openai-image-gen** - DALL-E images
- **openai-whisper** - Speech transcription
- **sherpa-onnx-tts** - Text-to-speech

### Media
- **spotify-player** - Spotify control
- **sonoscli** - Sonos audio
- **video-frames** - Video processing
- **songsee** - Song search

### Utilities
- **weather** - Weather forecasts
- **canvas** - HTML display
- **healthcheck** - System health
- **session-logs** - Session tracking
- **oracle** - Decision making

And 30+ more skills!

## 💰 Profit Tasks

Pre-configured automation tasks:

| Task | Schedule | Est. Revenue |
|------|----------|--------------|
| Daily Revenue Check | 9 AM daily | $0 |
| Social Media Update | Noon daily | $5 |
| Development Tasks | Every 30 min | $25 |
| Content Creation | 2 PM daily | $50 |
| Data Analysis | 6 PM daily | $10 |
| Communication Hub | Every 15 min | $5 |
| Knowledge Sync | 8 PM daily | $15 |
| Media Monitoring | Every 4 hours | $10 |

## 📊 Status Check

```bash
./start.sh status
```

Shows:
- Skills loaded
- Tasks completed
- Total revenue
- Profit goals progress
- Uptime

## 🔧 Configuration

Edit `config/bot.json`:

```json
{
  "profit": {
    "goals": {
      "daily": 100,
      "monthly": 3000
    }
  },
  "automation": {
    "checkInterval": 60000,
    "proactiveMode": true
  }
}
```

## 📁 Directory Structure

```
profit-awaken-bot/
├── src/
│   ├── bot.js           # Main bot engine
│   └── profit-tasks.js  # Profit automation tasks
├── skills/              # Loaded ForgeClaw skills
├── config/
│   └── bot.json         # Bot configuration
├── data/                # Profit tracking data
├── logs/                # Execution logs
├── start.sh             # Startup script
└── package.json         # Node.js config
```

## 🎯 Example Usage

```bash
# List all skills
./start.sh skills

# Execute a skill
./start.sh execute github list-issues

# Run profit task
./start.sh run

# Check status anytime
./start.sh status
```

## 📈 Profit Tracking

All revenue and tasks are tracked in `data/profit_state.json`:

```json
{
  "totalRevenue": 0,
  "tasksCompleted": 0,
  "history": [...]
}
```

## 🔌 Powered By

- **ForgeClaw Skills** - 52 extracted OpenClaw skills
- **OpenClaw Ecosystem** - 50+ community tools harvested
- **Memory Systems** - MemOS, MoltBrain, memU, memov
- **Alternative Architectures** - TinyClaw, IronClaw, NanoClaw, PicoClaw
- **OpenClaw** - Original skill source (MIT License)

## 🧠 Memory Systems Included

| System | Description |
|--------|-------------|
| MemOS | Memory operating system for agents |
| MoltBrain | Long-term memory for OpenClaw |
| memU | Agent memory layer for assistants |
| memov | Memory layer and retrieval toolkit |
| powermem | Long-term memory plugin |

## 🏗️ Alternative Architectures

| Project | Description |
|---------|-------------|
| TinyClaw | OpenClaw in 400 lines of code |
| IronClaw | Rust, privacy-focused |
| NanoClaw | Lightweight alternative |
| PicoClaw | Runs on $10 hardware |
| MicroClaw | Rust-based with tool execution |
| Carapace | Security-focused with sandboxing |

## 🔌 MCP Servers

- **openclaw-mcp-adapter** - Native OpenClaw tool access
- **openclaw-claude-code-skill** - Claude Code integration
- **openclaw-mcp-server** - MCP server for Gateway tools

## 📄 License

MIT - Skills extracted from OpenClaw (MIT License)
Original skill copyrights remain with their authors.

---

**💰 Let the profit flow!**
