import embedZero, {ID_CERVANTES, mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'newfrom',
    description: 'Obtiene el número de usuarios nuevos desde un núm. de días dado',
    async execute(client, message, args) {
        if(!args || args.length < 1) return  message.reply(`${mark} Debes poner un número de días ${down}`);
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        embed.title = `El total de usuarios __nuevos__ desde hace ${args[0]} días en ${cervantes.name} es:`;
        const today = new Date();
        const msec  = args[0] * 24 * 3600000;
        const news  = cervantes.members.filter(member => (today - member.joinedAt) <= msec); 
        embed.description = `${mark}  ${news.array().length}  ${down}`;
        const sentMessage = message.channel.send(`${today}`, {embed});
        },
};
