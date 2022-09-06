const fs = require('fs')

module.exports = (client) => {
    fs.readdirSync('./commands').forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))
        for (const file of commands) {
            const command = require(`../commands/${dir}/${file}`)
            command.data.category = dir
            client.commands.set(command.data.name, command)
        }
    })
}