const setupManager = require("../managers/setupManager");

module.exports = {

    name: "interactionCreate",

    async execute(interaction, client) {

        // Slash Commands
        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            return command.execute(interaction);

        }

        // Dropdowns
        if (interaction.isStringSelectMenu()) {

            // Main setup menu
            if (interaction.customId === "setup_action") {

                switch (interaction.values[0]) {

                    case "create":
                        return setupManager.startCreateWizard(interaction);

                    case "edit":
                        return interaction.reply({
                            content: "🚧 Coming soon.",
                            ephemeral: true
                        });

                    case "remove":
                        return interaction.reply({
                            content: "🚧 Coming soon.",
                            ephemeral: true
                        });

                }

            }

            // Step 1
            if (interaction.customId === "setup_select_join_channel") {

                return setupManager.selectJoinChannel(interaction);

            }

            // Step 2
            if (interaction.customId === "setup_select_category") {

                console.log("Category:", interaction.values[0]);

                return interaction.reply({

                    content:
                        "✅ Category saved.\n\nNext version will ask for the default channel name.",

                    ephemeral: true

                });

            }

        }

        // Buttons
        if (interaction.isButton()) return;

        // Modals
        if (interaction.isModalSubmit()) return;

    }

};