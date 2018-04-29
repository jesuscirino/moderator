import embedZero, {ID_CERVANTES, ID_PROMO, mark, down, deleteAllUntilAgo} from "../lib/defaultEmbed";
module.exports = {
    name: 'xpro',
    description: 'Borra mensajes de todos los canales categoría [promoción] desde hace [n] días. ',
    async execute(client, message, args) {
        if(!args || args.length < 1) return message.reply(`${mark}Debes colocar un número de días ${down}`) ;
        const numOfdays = args[0]
        const embed = Object.assign({}, embedZero)
        embed.title = `Depuración de canales de promoción`
        const cervantes = client.guilds.get(ID_CERVANTES)
        const promoCat  = cervantes.channels.filter(channel => channel.parentID === ID_PROMO)
        const sentMessage = await message.channel.send(`me tardaré varios minutos 😅`)
        let emoticon = '😌'; let cm = 0;let index = 1
        for (let channel of promoCat.values()) {
            emoticon = emoticon === '😎' ? '😌' : '😎'
            await sentMessage.edit(`${emoticon} ${mark} ... procesando ${channel.name} ...${down}`)
            cm += await deleteAllUntilAgo(numOfdays, channel)
            }
        embed.description = `${mark} Fin de la depuración ${down}`
        await sentMessage.edit(`Se escanearon  ${promoCat.size} canales y borré ${cm} mensajes más antiguos a ${args[0]} días`, {embed})
        }
}
