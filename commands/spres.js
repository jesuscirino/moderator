import embedZero, {ID_CERVANTES, ID_STEEMPRESS, mark, down, 
    getSteemitLink, getMessagesFrom} from "../lib/defaultEmbed";
import {getJsonMetadata} from "../lib/steemFunc";
module.exports = {
    name: 'spres',
    description: 
    'Borra los mensajes de steempress-links-promo que no contienen tags SPANISH y CERVANTES y NO están publicadas desde STEEMPRESS',
    async execute(client, message, args) {
        const embed = Object.assign({}, embedZero)
        embed.title = `Depuración de canales de promoción`
        const cervantes = client.guilds.get(ID_CERVANTES)
        const chSteemPress  = cervantes.channels.get(ID_STEEMPRESS);
        const emoM = cervantes.emojis.find('name','moderator')
        const emoIDM = emoM.id
        const emoF = cervantes.emojis.find('name','frida')
        const emoIDF = emoF.id
        const emoC = cervantes.emojis.find('name','cervantes')
        const emoIDC = emoC.id
        //const sentMessage = await message.channel.send(`me tardaré varios minutos 😅`)
        //let emoticon = '😌'; let cm = 0;let index = 1
        //for (let channel of promoCat.values()) {
         //   emoticon = emoticon === '😎' ? '😌' : '😎'
          //  await sentMessage.edit(`${emoticon} ${mark} ... procesando ${channel.name} ...${down}`)
           // cm += await deleteAllUntilAgo(numOfdays, channel, true, false, emoIDRobot)
            //}
        embed.description = `${mark} Fin de la depuración ${down}`
        //await sentMessage.
         //   edit(`Se escanearon  ${promoCat.size} mensajes y encontré ${cm} post sin TAGS adecuados`, {embed})
        const collMessages = await getMessagesFrom(chSteemPress)
        const arrMessages  = collMessages.map(async m => {
            const post = getSteemitLink(m.content)
            if(post){
                const {author, permlink} = post
                const jsonMetadata = await getJsonMetadata(author, permlink)
                const {community, tags} = jsonMetadata
                if(community && tags.includes('cervantes') && tags.includes('spanish')){
                    console.log(`${m.content} **********`)
                    //await m.react(emoIDM)
                    
                }

                else{
                    console.log(`${m.content} ~~~~~~~~~~`)
                    await m.delete()
                }
                
            }
            else{
                    //await m.react(emoIDC)
                    console.log(`${m.content} XXXXXXXXXXXXXXXXXXXXX`)
                
            }
        }) 
        //console.log(collMessages)
        }
}
