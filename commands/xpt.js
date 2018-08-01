import embedZero, {ID_CERVANTES, ID_STEEMPRESS, mark, down, 
    getSteemitLink, getMessagesFrom} from "../lib/defaultEmbed";
import {getJsonMetadata} from "../lib/steemFunc";
module.exports = {
    name: 'xpt',
    description: 
    'Versión mejorada de xprotag para categoria de promoción',
    async execute(client, message, args) {
        const embed = Object.assign({}, embedZero)
        embed.title = `Depuración de canales de promoción`
        const cervantes = client.guilds.get(ID_CERVANTES)
        const chSteemPress  = cervantes.channels.get(ID_STEEMPRESS);
        const emoM = cervantes.emojis.find('name','moderator')
        const emoIDM = emoM.id
        const sentMessage = await message.channel.send(`iniciando ... 🤓`)
        let counterBads = 0
        embed.description = `${mark} Fin de la depuración ${down}`
        const collMessages = await getMessagesFrom(chSteemPress)
        const arrMessages  = collMessages.map(async m => {
            const post = getSteemitLink(m.content)
            if(post){
                const {author, permlink} = post
                const jsonMetadata = await getJsonMetadata(author, permlink)
                const {community, tags} = jsonMetadata
                if(community && tags.includes('cervantes') && tags.includes('spanish')){
                    console.log(`##GOOD ${m.content}`)
                }
                else{
                    console.log(`$$BAD$ {m.content}`)
                    await m.delete()
                }
            }
            else{
                    console.log(`&&TEXTO ${m.content} `)
            }
        }) 
        await sentMessage.
           edit(`Se escanearon ${collMessages.size} mensajes, 
               encontré y borré ${counterBads} post sin TAG cervantes y spanish
               o que no fueron publicados desde steempress`, {embed})
        }
}
