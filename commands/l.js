import embedZero, {ID_CERVANTES, mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'l',
    description: 'Solo jesús sabe... ',
    async execute(client, message) {
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        //embed.title = `El total de usuarios al momento en ${cervantes.name} es:`;
        //embed.description = `${mark}  ${cervantes.memberCount}  ${down}`;
        //const sentMessage = message.channel.send("", {embed});
        console.log('...emo')
        //const l = cervantes.emojis.map(e => e.toString()).join(" ");
        const l = cervantes.emojis.map(e => e.id).join(" ");
        //await message.channel.send(l)
        //const emoIDRobot = cervantes.emojis.find('name','robot~1')
        //console.log(emoIDRobot.id)
        //await message.react(emoIDRobot.id)

        await message.react('🤖')

        },
};
