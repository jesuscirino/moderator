import embedZero, {ID_CERVANTES, mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'total',
    description: 'Muestra el total de usuarios en el Servidor',
    execute(client, message) {
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        embed.title = `El total de usuarios al momento en ${cervantes.name} es:`;
        embed.description = `${mark}  ${cervantes.memberCount}  ${down}`;
        const sentMessage = message.channel.send("", {embed});
        },
};
