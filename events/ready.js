const { ActivityType } = require('discord.js');
const fetch = require('node-fetch');
const { Database } = require('quickmongo')

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {

    client.db = new Database(process.env.MONGO_URI)
    client.db.on("ready", () => {
      console.log("Connected to the database");
    });
    await client.db.connect();

    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity('/help', { type: ActivityType.Listening })

    // setInterval(async () => {
    //   await fetch(`https://rest.amprad.io/metadata?station=${Buffer.from(process.env.LOFI).toString('base64')}`).then(async res => {
    //     let data = await res.json()
    //     client.user.setActivity(data.title, { type: ActivityType.Listening })
    //   })
    // }, 60_000)
  },
};