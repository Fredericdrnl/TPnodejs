const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user'){
            const user = interaction.options.getUser('target');
            if (user) {
                await interaction.reply(`**Name: ** ${user.username} \n**Server join Date: ** ${user.joinedAt}`)
            } else {
                await interaction.reply(`**Name: ** ${interaction.user.username} \n**Server join Date: ** ${interaction.member.joinedAt}`)
            }
        }else if (interaction.options.getSubcommand() === 'server'){
            await interaction.reply(`**Name: ** ${interaction.guild.name} \n**Server join Date: ** ${interaction.guild.memberCount}`)
        }
    },
}   