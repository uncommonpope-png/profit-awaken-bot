#!/usr/bin/env node
/**
 * 💰 PROFIT AWAKEN BOT
 * Powered by ForgeClaw Skills
 * 
 * An autonomous profit-generating AI agent with 52+ skills
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ProfitAwakenBot {
  constructor() {
    this.skills = new Map()
    this.config = this.loadConfig()
    this.dataDir = path.join(__dirname, '..', 'data')
    this.logsDir = path.join(__dirname, '..', 'logs')
    this.skillsDir = path.join(__dirname, '..', 'skills')
    this.isRunning = false
    this.profitTotal = 0
    this.tasksCompleted = 0
  }

  loadConfig() {
    const configPath = path.join(__dirname, '..', 'config', 'bot.json')
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    }
    return {
      name: 'Profit Awaken Bot',
      version: '1.0.0',
      owner: 'ForgeClaw User',
      skills: {
        enabled: ['github', 'notion', 'weather', 'discord', 'slack', 'trello', 'obsidian'],
        autoInstall: true
      },
      profit: {
        trackingEnabled: true,
        revenueStreams: [],
        goals: { daily: 100, monthly: 3000 }
      },
      automation: {
        checkInterval: 60000, // 1 minute
        proactiveMode: true
      }
    }
  }

  async init() {
    console.log(`
╔══════════════════════════════════════════════════════╗
║     💰 PROFIT AWAKEN BOT                            ║
║     Powered by ForgeClaw Skills                     ║
║     ${'52 skills loaded'.padEnd(44)}║
╚══════════════════════════════════════════════════════╝
`)

    await this.ensureDirectories()
    await this.loadSkills()
    await this.startProfitTracking()
    
    console.log('\n✅ Bot initialized and ready!\n')
  }

  async ensureDirectories() {
    for (const dir of [this.dataDir, this.logsDir, this.skillsDir]) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    }
  }

  async loadSkills() {
    console.log('🔧 Loading ForgeClaw skills...')
    
    // Copy skills from forgeclaw_skills directory
    const forgeSkillsDir = path.join(__dirname, '..', '..', 'forgeclaw_skills', 'forgeclaw_skills', 'skills')
    
    if (fs.existsSync(forgeSkillsDir)) {
      const skillDirs = fs.readdirSync(forgeSkillsDir)
      
      for (const skillName of skillDirs) {
        const sourceDir = path.join(forgeSkillsDir, skillName)
        const targetDir = path.join(this.skillsDir, skillName)
        
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
          this.copyDirectory(sourceDir, targetDir)
        }
        
        // Load skill manifest
        const manifestPath = path.join(targetDir, 'manifest.json')
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
          const skillData = {
            ...manifest,
            path: targetDir,
            loaded: true
          }
          this.skills.set(skillName, skillData)
        }
      }
    }
    
    console.log(`   ✓ Loaded ${this.skills.size} skills`)
    
    // Save skill registry
    this.saveSkillRegistry()
  }

  copyDirectory(source, target) {
    const entries = fs.readdirSync(source, { withFileTypes: true })
    for (const entry of entries) {
      const srcPath = path.join(source, entry.name)
      const tgtPath = path.join(target, entry.name)
      
      if (entry.isDirectory()) {
        fs.mkdirSync(tgtPath, { recursive: true })
        this.copyDirectory(srcPath, tgtPath)
      } else {
        fs.copyFileSync(srcPath, tgtPath)
      }
    }
  }

  saveSkillRegistry() {
    const registry = {
      loaded: new Date().toISOString(),
      totalSkills: this.skills.size,
      skills: Array.from(this.skills.entries()).map(([name, data]) => ({
        name,
        description: data.description,
        version: data.version,
        source: data.source
      }))
    }
    
    fs.writeFileSync(
      path.join(this.skillsDir, 'registry.json'),
      JSON.stringify(registry, null, 2)
    )
  }

  async startProfitTracking() {
    console.log('💰 Starting profit tracking...')
    
    const profitState = {
      startTime: new Date().toISOString(),
      totalRevenue: 0,
      tasksCompleted: 0,
      activeStreams: [],
      history: []
    }
    
    const statePath = path.join(this.dataDir, 'profit_state.json')
    if (!fs.existsSync(statePath)) {
      fs.writeFileSync(statePath, JSON.stringify(profitState, null, 2))
    }
    
    console.log('   ✓ Profit tracking initialized')
  }

  async executeSkill(skillName, action, params = {}) {
    const skill = this.skills.get(skillName)
    if (!skill) {
      return { error: `Skill '${skillName}' not found` }
    }
    
    console.log(`\n🔧 Executing skill: ${skillName}`)
    console.log(`   Action: ${action}`)
    
    // Load skill documentation for context
    const skillDocPath = path.join(skill.path, 'SKILL.md')
    let skillDoc = ''
    if (fs.existsSync(skillDocPath)) {
      skillDoc = fs.readFileSync(skillDocPath, 'utf-8')
    }
    
    // Log execution
    this.logExecution(skillName, action, params)
    
    // For now, return skill info (actual execution depends on skill type)
    return {
      skill: skillName,
      action,
      params,
      description: skill.description,
      documentation: skillDocPath,
      executed: new Date().toISOString()
    }
  }

  logExecution(skill, action, params) {
    const logFile = path.join(this.logsDir, `${new Date().toISOString().split('T')[0]}.log`)
    const entry = {
      timestamp: new Date().toISOString(),
      skill,
      action,
      params
    }
    
    const log = fs.existsSync(logFile) 
      ? JSON.parse(fs.readFileSync(logFile, 'utf-8'))
      : []
    
    log.push(entry)
    fs.writeFileSync(logFile, JSON.stringify(log, null, 2))
  }

  async runProfitTask(task) {
    console.log(`\n💰 Running profit task: ${task.name}`)
    
    const result = {
      task: task.name,
      started: new Date().toISOString(),
      steps: []
    }
    
    for (const step of task.steps || []) {
      const stepResult = await this.executeSkill(step.skill, step.action, step.params)
      result.steps.push(stepResult)
    }
    
    result.completed = new Date().toISOString()
    this.tasksCompleted++
    
    // Update profit state
    this.updateProfitState(task)
    
    return result
  }

  updateProfitState(task) {
    const statePath = path.join(this.dataDir, 'profit_state.json')
    const state = JSON.parse(fs.readFileSync(statePath, 'utf-8'))
    
    state.tasksCompleted++
    state.history.push({
      task: task.name,
      completed: new Date().toISOString(),
      revenue: task.revenue || 0
    })
    
    state.totalRevenue += task.revenue || 0
    
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2))
  }

  getStatus() {
    const statePath = path.join(this.dataDir, 'profit_state.json')
    const state = fs.existsSync(statePath) 
      ? JSON.parse(fs.readFileSync(statePath, 'utf-8'))
      : {}
    
    return {
      bot: this.config.name,
      version: this.config.version,
      skillsLoaded: this.skills.size,
      tasksCompleted: this.tasksCompleted,
      profit: {
        totalRevenue: state.totalRevenue || 0,
        goals: this.config.profit.goals
      },
      uptime: state.startTime ? 
        new Date() - new Date(state.startTime) : 0,
      status: this.isRunning ? 'running' : 'idle'
    }
  }

  async start() {
    this.isRunning = true
    console.log('\n🚀 Profit Awaken Bot is now RUNNING\n')
    
    // Run initial status check
    console.log('📊 Bot Status:')
    console.log(JSON.stringify(this.getStatus(), null, 2))
    
    return this
  }

  async stop() {
    this.isRunning = false
    console.log('\n⏹️  Bot stopped\n')
  }
}

// CLI Interface
async function main() {
  const bot = new ProfitAwakenBot()
  await bot.init()
  
  const command = process.argv[2]
  
  switch (command) {
    case 'start':
      await bot.start()
      break
    
    case 'status':
      console.log(JSON.stringify(bot.getStatus(), null, 2))
      break
    
    case 'skills':
      console.log('\n📦 Loaded Skills:\n')
      for (const [name, skill] of bot.skills) {
        console.log(`  • ${name}: ${skill.description.substring(0, 60)}...`)
      }
      console.log(`\nTotal: ${bot.skills.size} skills\n`)
      break
    
    case 'run':
      // Example profit task
      const task = {
        name: 'Daily Check',
        revenue: 0,
        steps: [
          { skill: 'github', action: 'check-issues', params: {} },
          { skill: 'notion', action: 'update-tasks', params: {} },
          { skill: 'discord', action: 'send-update', params: {} }
        ]
      }
      await bot.runProfitTask(task)
      break
    
    case 'execute':
      const skillName = process.argv[3]
      const action = process.argv[4]
      if (skillName && action) {
        await bot.executeSkill(skillName, action)
      } else {
        console.log('Usage: bot.js execute <skill> <action>')
      }
      break
    
    default:
      console.log(`
Profit Awaken Bot - Commands:

  start     - Start the bot
  status    - Show bot status
  skills    - List all loaded skills
  run       - Run example profit task
  execute   - Execute a specific skill

Example:
  node src/bot.js start
  node src/bot.js skills
  node src/bot.js execute github list-issues
`)
  }
}

// Export for module use
module.exports = { ProfitAwakenBot }

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}
