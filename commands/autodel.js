import embedZero, {mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'p',
    description: 'Recarga cambios en comandos',
    args: true,
    async execute(client, message, args) {
        if(!args || args.length < 1) return message.reply(`${mark}Debes colocar el nombre del módulo del comando ${down}`) ;
        if(!args || args.size < 1) return ;
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        const command = require(`./${args[0]}`);
        client.commands.set(command.name, command);
        await message.reply(`The command ${args[0]} se cargó de nuevo.. 😜`);
        },
};
