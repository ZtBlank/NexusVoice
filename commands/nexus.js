const {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("nexus")
        .setDescription("Nexus Voice Administration")

        .addSubcommand(subcommand =>
            subcommand
                .setName("setup")
                .setDescription("Open the Nexus Voice setup wizard")
        ),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setTitle("⚙️ Nexus Voice Setup")
            .setDescription(
                "Select what you would like to do."
            );

        const menu = new StringSelectMenuBuilder()
            .setCustomId("setup_action")
            .setPlaceholder("Choose an action...")
            .addOptions(

                new StringSelectMenuOptionBuilder()
                    .setLabel("Create Join-to-Create")
                    .setDescription("Create a new Join-to-Create setup")
                    .setValue("create"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Edit Join-to-Create")
                    .setDescription("Modify an existing setup")
                    .setValue("edit"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Remove Join-to-Create")
                    .setDescription("Delete an existing setup")
                    .setValue("remove")

            );

        const row = new ActionRowBuilder()
            .addComponents(menu);

        await interaction.reply({

            embeds: [embed],

            components: [row],

            ephemeral: true

        });

    }

};