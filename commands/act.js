import embedZero, {ID_CERVANTES, ID_GRAL, mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'act',
    description: 'Obtiene el número de usuarios activos desde un núm. de días dado',
    async execute(client, message, args) {
        if(!args || args.length < 1) return  await message.reply(`${mark} Debes poner un número de días ${down}`);
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        const chatGral  = cervantes.channels.get(ID_GRAL);
        const LIM       = 100;
        const today = new Date();
        const msec  = args[0] * 24 * 3600000;
        const setUsers  = new Set();
        let collMess  = await chatGral.fetchMessages({limit:LIM });
        let last = collMess.last();
        const sentMessage = await message.channel.send(`unos segunditos 😅`);
        let emoticon = '😌', cm = LIM;
        do  {
            emoticon = emoticon === '😎' ? '😌' : '😎';
            let names = collMess.map(m => m.author.username)
            for(let n of names) setUsers.add(n);
            collMess = await chatGral.fetchMessages({limit: LIM, before:last.id });
        //    console.log(`${cm} mensajes en ${last.createdAt} -- ${last.author.username}`)
            await sentMessage.edit(`${emoticon} ${mark} ... procesados ${cm} mensajitos ...${down}`);
            last     = collMess.last();
            cm      += LIM; 

        }while((today - last.createdAt) <= msec);
        embed.title = `El total de usuarios __activos__ desde hace ${args[0]} días en ${chatGral.name} es:`;
        //embed.description = `${mark}  ${setUsers.size}  ${down}`;
        embed.description = `${mark} * ${setUsers.size} usuarios diferentes
        > se mandaron ${cm} mensajitos aprox${down}`;
        sentMessage.edit(`${today}`, {embed});
        },
};
