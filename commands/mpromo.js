import embedZero, {ID_PROMO, ID_CERVANTES, mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'pro',
    description: 'Relacion enlaces en canales de promoción',
    async execute(client, message, args) {
        if(!args || args.length < 1) return message.reply(`${mark}Debes colocar un número de días ${down}`) ;
        const embed = Object.assign({}, embedZero);
        embed.title = `El total de mensajes hace ${args[0]} fue:\n`;
        const cervantes = client.guilds.get(ID_CERVANTES);
        const promoCat  = cervantes.channels.filter(channel => channel.parentID === ID_PROMO);
        let response = promoCat.reduce((a, channel) => a + '\n' + channel.name , promoCat.first().name);
        let arrayRes = response.split("\n"); 
        const today = new Date();
        const msec  = args[0] * 24 * 3600000;
        const sentMessage = await message.channel.send(`unos segunditos 😅`);
        let filt = message => (today - message.createdAt) <= msec;
        let emoticon = '😌'; let cm = 0;let index = 1;
        for (let channel of promoCat.values()) {
            emoticon = emoticon === '😎' ? '😌' : '😎';
            await sentMessage.edit(`${emoticon} ${mark} ... procesando ${channel.name} ...${down}`);
            const LIM       = 100;
            let collMess  = await channel.fetchMessages({limit:LIM });
            let last = collMess.last();
            let size = 0;
            collMess = collMess.filter(filt);
            size    += collMess.size;
            if (collMess.size === LIM)
                while(collMess.size === LIM){

                collMess = await channel.fetchMessages({limit: LIM, before:last.id });
                last = collMess.last();
                collMess = collMess.filter(filt);
                size    += collMess.size;
                
            };
            arrayRes[index] = arrayRes[index++] + ' -- ' + size;
            cm      += size; 
            //console.log(`${typeof last}--${channel.name} -- ${size}`);

            //let mc = await channel.fetchMessages({limit: 100});
            //mc = mc.filter(filt);
            //arrayRes[index] = arrayRes[index++] + ' -- ' + mc.size;
              }
        arrayRes.shift();
        response = arrayRes.join('\n');
        embed.description = `${mark}  ${response}  ${down}`;
        await sentMessage.edit(`Se escanearon  ${promoCat.size} canales con ${cm} Mensajes encontrados desde hace ${args[0]} días`, {embed});
        },
};
