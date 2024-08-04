require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose')
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences,
  ],
});

(async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.URI);
    console.log("Connected to database")

    eventHandler(client);

    
    client.login(process.env.TOKEN);
  } catch (error) {
    console.log("Error: " + error)
  }
})()
