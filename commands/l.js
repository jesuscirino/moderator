import embedZero, {ID_CERVANTES,getMessagesFrom, mark, down} from "../lib/defaultEmbed";
import {daysOld} from "../lib/discFunc";

module.exports = {
    name: 'l',
    description: 'Solo jesús sabe... ',
    async execute(client, message) {
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        const idChDesarrCervantes = '370590362282229760'
        const ch = cervantes.channels.get(idChDesarrCervantes);
        console.log(ch.name)
        const {lastMessageID} = ch
        const lastM = await ch.fetchMessage(lastMessageID)
        console.log('createdAt', lastM.createdAt)
        console.log('timeStamp',lastM.createdTimestamp)
        console.log('dias Trans: ', daysOld(lastM.createdAt))
        /*
        let collMessages
        try{
        collMessages = await getMessagesFrom(ch)
        }
        catch(e){
            console.log(e.message)
        }
        */

        //embed.title = `El total de usuarios al momento en ${cervantes.name} es:`;
        //embed.description = `${mark}  ${cervantes.memberCount}  ${down}`;
        //const sentMessage = message.channel.send("", {embed});
        //const l = cervantes.emojis.map(e => e.toString()).join(" ");
        const l = cervantes.emojis.map(e => e.id).join(" ");
        await message.channel.send(l)
        const emoIDRobot = cervantes.emojis.find('name','moderator')
        //console.log(emoIDRobot.id)
        await message.react(emoIDRobot.id)
        //await message.react('🤖')

        },
};
