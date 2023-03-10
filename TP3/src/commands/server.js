const { SlashCommandBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Recupere les infos du perso'),

    async execute(interaction) {
        await interaction.reply(`**Name: ** ${interaction.guild.name} \n**Server join Date: ** ${interaction.guild.memberCount}`)
    },
}