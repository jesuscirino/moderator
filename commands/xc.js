import embedZero, {ID_CERVANTES, mark, down} from "../lib/defaultEmbed";
import {steemEmbedAcc} from "../lib/steemFunc";

module.exports = {
    name: 'xc',
    description: 'Limpia canales de Promoción Servidor',
    execute(client, message) {
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        embed.title = `El total de usuarios al momento en ${cervantes.name} es:`;
        embed.description = `${mark}  ${cervantes.memberCount}  ${down}`;
        const sentMessage = message.channel.send("", {embed});
        },
}
