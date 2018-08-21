import embedZero, {ID_CERVANTES, mark, down, deleteAllUntilAgo} from "../lib/defaultEmbed";

module.exports = {
    name: 'xc',
    description: 'Borra mensajes de un canal [id] desde hace [n] días. ',
    async execute(client, message, args) {
        if(!args || args.length < 2) return message
            .reply(`${mark}Debes colocar un número de días y el ID del canal ${down}`) ;
        const [idChannel, numOfdays ] = args
        const embed = Object.assign({}, embedZero)
        const cervantes = client.guilds.get(ID_CERVANTES)
        const ch = cervantes.channels.get(idChannel)
        // set steemit=false and unique=true
        const counter = await deleteAllUntilAgo(numOfdays, ch, false, true)
        embed.title = `seleccionado ${ch.name} `
        const sentMessage1 = await message.channel.send(`Espera ... 😅`);
        embed.description = `${mark} Borré  ${counter} mensajes!  ${down}`;
        const sentMessage = message.channel.send("", {embed});
        //const sentMessage = await message.channel.send(`se borraron ${counter}`, {embed})
        }
}
