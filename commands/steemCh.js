import embedZero, {ID_CERVANTES, mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'sc',
    description: 'Muestra resumen de una cuenta en steemit.',
    execute: (client, message, args)  => {
        if(!args || args.length < 1) return message.reply(`${mark}Debes colocar un nombre de usuario steemit ${down}`) ;
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        embed.title = `conectando steemit`;
        embed.description = `${mark} lalcuentavaqui   ${down}`;
        const sentMessage = message.channel.send("", {embed});
        }
};
