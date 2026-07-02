const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    EmbedBuilder,
    ChannelType
} = require("discord.js");

module.exports = {

    name: "interactionCreate",

    async execute(interaction, client) {

        // ============================
        // Slash Commands
        // ============================

        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            return command.execute(interaction);

        }

        // ============================
        // Dropdown Menus
        // ============================

        if (!interaction.isStringSelectMenu()) return;

        // --------------------------------
        // Main Setup Menu
        // --------------------------------

        if (interaction.customId === "setup_action") {

            const selected = interaction.values[0];

            if (selected !== "create") {

                return interaction.update({

                    embeds: [

                        new EmbedBuilder()
                            .setColor(0x2b2d31)
                            .setTitle("🚧 Coming Soon")
                            .setDescription(
                                `**${selected}** will be available in the next update.`
                            )

                    ],

                    components: []

                });

            }

            // ============================
            // STEP 1
            // Select Join Channel
            // ============================

            const voiceChannels = interaction.guild.channels.cache
                .filter(channel => channel.type === ChannelType.GuildVoice);

            const menu = new StringSelectMenuBuilder()
                .setCustomId("setup_join_channel")
                .setPlaceholder("Select a Join-to-Create voice channel");

            voiceChannels
                .first(25)
                .forEach(channel => {

                    menu.addOptions(

                        new StringSelectMenuOptionBuilder()
                            .setLabel(channel.name)
                            .setValue(channel.id)

                    );

                });

            return interaction.update({

                embeds: [

                    new EmbedBuilder()
                        .setColor(0x5865F2)
                        .setTitle("Step 1 / 3")
                        .setDescription(
                            "Select the voice channel that members will join."
                        )

                ],

                components: [

                    new ActionRowBuilder()
                        .addComponents(menu)

                ]

            });

        }

        // --------------------------------
        // Step 1 selected
        // --------------------------------

        if (interaction.customId === "setup_join_channel") {

            return interaction.reply({

                content:
                    "✅ Voice channel selected.\n\n(Category selection comes next in v0.2 Part 2.)",

                ephemeral: true

            });

        }

    }

};