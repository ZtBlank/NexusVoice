const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "..", "config", "jtc.json");

function loadConfig() {

    if (!fs.existsSync(CONFIG_PATH)) {

        fs.writeFileSync(
            CONFIG_PATH,
            JSON.stringify({ guilds: {} }, null, 4)
        );

    }

    return JSON.parse(fs.readFileSync(CONFIG_PATH));

}

function saveConfig(data) {

    fs.writeFileSync(
        CONFIG_PATH,
        JSON.stringify(data, null, 4)
    );

}

function createGuild(guildId) {

    const config = loadConfig();

    if (!config.guilds[guildId]) {

        config.guilds[guildId] = {
            joinToCreate: []
        };

        saveConfig(config);

    }

    return config;

}

module.exports = {

    loadConfig,
    saveConfig,
    createGuild

};