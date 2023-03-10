const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const conf = require('../conf.json');
const fs = require('node:fs');
const path = require('node:path');
const TOKEN = conf.token;

// Créer un nouveau client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
        // console.log(`Commande chargé : ${command.name}`);
    }
    else{
        console.log('Warning');
    }
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `Aucune commande ${interaction.commandName} n'a été trouvée.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'Erreur dans l\'exécution de la commande !',
            ephemeral: true,
        });
    }
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        // console.log(`Event chargé : ${event.name}`);
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        // console.log(`Event chargé : ${event.name}`);
    }
}
// Le token permet à votre client de se connecter à Discord
client.login(TOKEN);