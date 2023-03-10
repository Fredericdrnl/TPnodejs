const { SlashCommandBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Recupere les infos du perso'),

    async execute(interaction) {
        await interaction.reply(`**Name: ** ${interaction.user.username} \n**Server join Date: ** ${interaction.member.joinedAt}`)

    },
}