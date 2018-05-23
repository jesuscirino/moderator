import embedZero, {ID_CERVANTES, mark, down, deleteAllUntilAgo} from "../lib/defaultEmbed";

module.exports = {
    name: 'xctag',
    description: 'Elimina Posts con malos Tags, de un canal individual. (Similar a xprotag) ',
    async execute(client, message, args) {
        if(!args || args.length < 2) return message
            .reply(`${mark}Debes colocar un número de días y el ID del canal ${down}`) ;
        const [idChannel, numOfdays ] = args
        const embed = Object.assign({}, embedZero)
        const cervantes = client.guilds.get(ID_CERVANTES)
        const ch = cervantes.channels.get(idChannel)
        // set steemit=false and unique=true
        const counter = await deleteAllUntilAgo(numOfdays, ch, true, true)
        embed.title = `Seleccionado ${ch.name} `
        const sentMessage1 = await message.channel.send(`Espera ... 😅`);
        embed.description = `${mark} Borré  ${counter} mensajes con malos tags!  ${down}`;
        const sentMessage = message.channel.send("", {embed});
        //const sentMessage = await message.channel.send(`se borraron ${counter}`, {embed})
        }
}
