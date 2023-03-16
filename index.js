const { ShardingManager } = require('discord.js')
const { config } = require('dotenv')
config({
    path: `${__dirname}/.env`
});
const token = process.env.TOKEN

const manager = new ShardingManager('./app.js', { token: token })

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`))

manager.spawn()

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error)
});