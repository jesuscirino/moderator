import embedZero, {mark, down} from "../lib/defaultEmbed";
const {prefix} = require('../conf.json');
module.exports = {
    name: '?',
    description: 'Muestra la lista de comandos disponibles con su descripción de funcionamiento',
    async execute(client, message, args) {
        const embed = Object.assign({}, embedZero);
        embed.title = `Todos los comandos`;
        const response = client.commands.map(cmd => `${prefix}**${cmd.name}**:  ${mark}${cmd.description}${down}`);
        embed.description = '**Memoriza solo este:**  `ñ?`  😅'
        const sentMessage = await message.channel.send(`${response.join('\n')}`, {embed});
    }
}
