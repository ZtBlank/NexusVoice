const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    EmbedBuilder,
    ChannelType
} = require("discord.js");

const setupCache = new Map();

async function startCreateWizard(interaction) {

    const voiceChannels = interaction.guild.channels.cache
        .filter(c => c.type === ChannelType.GuildVoice)
        .sort((a, b) => a.position - b.position);

    const menu = new StringSelectMenuBuilder()
        .setCustomId("setup_select_join_channel")
        .setPlaceholder("Select the Join-to-Create voice channel");

    voiceChannels.forEach(channel => {

        menu.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(channel.name)
                .setValue(channel.id)
        );

    });

    await interaction.update({

        embeds: [

            new EmbedBuilder()
                .setColor(0x5865F2)
                .setTitle("⚙️ Nexus Voice Setup")
                .setDescription(
                    "**Step 1 / 4**\n\nSelect the Join-to-Create voice channel."
                )

        ],

        components: [

            new ActionRowBuilder()
                .addComponents(menu)

        ]

    });

}

async function selectJoinChannel(interaction) {

    setupCache.set(interaction.user.id, {

        joinChannel: interaction.values[0]

    });

    const categories = interaction.guild.channels.cache
        .filter(c => c.type === ChannelType.GuildCategory)
        .sort((a, b) => a.position - b.position);

    const menu = new StringSelectMenuBuilder()
        .setCustomId("setup_select_category")
        .setPlaceholder("Select the category");

    categories.forEach(category => {

        menu.addOptions(

            new StringSelectMenuOptionBuilder()
                .setLabel(category.name)
                .setValue(category.id)

        );

    });

    await interaction.update({

        embeds: [

            new EmbedBuilder()
                .setColor(0x5865F2)
                .setTitle("⚙️ Nexus Voice Setup")
                .setDescription(
                    "**Step 2 / 4**\n\nSelect the category where temporary channels will be created."
                )

        ],

        components: [

            new ActionRowBuilder()
                .addComponents(menu)

        ]

    });

}

module.exports = {

    setupCache,

    startCreateWizard,

    selectJoinChannel

};