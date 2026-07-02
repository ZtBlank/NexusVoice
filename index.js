require("dotenv").config();

const fs = require("fs");
const path = require("path");
const {
    Client,
    Collection,
    GatewayIntentBits,
    REST,
    Routes
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

const commands = [];
const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(commandsPath, file));

    client.commands.set(command.data.name, command);

    commands.push(command.data.toJSON());

}

const eventsPath = path.join(__dirname, "events");

const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {

    const event = require(path.join(eventsPath, file));

    if (event.once)
        client.once(event.name, (...args) =>
            event.execute(...args, client)
        );

    else
        client.on(event.name, (...args) =>
            event.execute(...args, client)
        );

}

const rest = new REST({
    version: "10"
}).setToken(process.env.TOKEN);

client.once("clientReady", async () => {

    console.log(`✅ ${client.user.tag} online`);

    try {

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: commands
            }
        );

        console.log("✅ Slash Commands Registered");

    } catch (err) {

        console.error(err);

    }

});

client.login(process.env.TOKEN);