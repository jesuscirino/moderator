import embedZero, {ID_CERVANTES, ID_PROMO, mark, down, 
    getSteemitLink,  getMessagesFrom} from "../lib/defaultEmbed";
import {getJsonMetadata} from "../lib/steemFunc";
module.exports = {
    name: 'xpt',
    description: 
    'Versión mejorada de xprotag para categoria de promoción',
    async execute(client, message, args) {
        const embed = Object.assign({}, embedZero)
        embed.title = `Depuración de canales de promoción`
        const cervantes = client.guilds.get(ID_CERVANTES)
        const promoCat  = cervantes.channels.filter(channel => channel.parentID === ID_PROMO)
        const emoM = cervantes.emojis.find('name','moderator')
        const emoIDM = emoM.id
        const sentMessage = await message.channel.send(`iniciando ... 🤓`)
        let counterBads = 0
        let counter = 0
        let emoticon = '😌'; let cm = 0;let index = 1
        embed.description = `${mark} Fin de la depuración ${down}`
        for (let channel of promoCat.values()) {
            emoticon = emoticon === '😎' ? '😌' : '😎'
            await sentMessage.edit(`${emoticon} ${mark} ... procesando ${channel.name} ...${down}`)
            let collMessages;
            try{
            collMessages = await getMessagesFrom(channel).
                        catch(e => console.log(e))
            counter += collMessages.size
                
            }
            catch(e){
                console.log(e.message)
                continue
            }
            let arrMessages  = collMessages.map(async m => {
                let post = getSteemitLink(m.content)
                //console.log(post)
                if(post){
                    const {author, permlink} = post
                    const jsonMetadata = await getJsonMetadata(author, permlink).
                        catch(e => console.log(e))
                    const {tags} = jsonMetadata
                    if(tags.includes('cervantes') && 
                        tags.includes('spanish') && 
                        tags.includes(channel.name)){
                        console.log(`##GOOD ${channel.name} ${m.content}`)
                        //await m.react(emoIDM).catch(console.log('38 discord emoticono'))
                    }
                    else{
                        counterBads += 1
                        console.log(`$$BAD ${channel.name} ${m.content}`)
                        await m.delete().catch(console.log('43 discord delete'))
                    }
                }
                else{
                        console.log(`&&TEXTO ${m.content} `)
                }
            }) 
            }
        await sentMessage.
           edit(`Se escanearon ${counter.size} mensajes, 
               encontré y borré ${counterBads} post sin TAG cervantes y spanish
               o que no fueron publicados desde steempress`, {embed})
        }
}
