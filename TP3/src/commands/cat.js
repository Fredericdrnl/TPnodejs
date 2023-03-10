const { request } = require('undici')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription("Réponse : prend un input en option et le renvoi à l'utilisateur"),
    async execute(interaction) {
        const catResult = await request('https://aws.random.cat/meow')
        const { file } = await catResult.body.json()
        let ballembed = new EmbedBuilder()
            ballembed.setColor(0x000000)
            ballembed.setDescription(" ")
            ballembed.setThumbnail(file,)
        await interaction.channel.send({embeds: [ballembed]});
    }, 
}