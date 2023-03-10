const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription("Réponse : prend un input en option et le renvoi à l'utilisateur")
        .addStringOption(option =>
			option.setName('target')
                .setDescription('zazfazf')),
    async execute(interaction) {
        await interaction.reply(interaction.options.getString('target'));
    }, 
}