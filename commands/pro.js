import embedZero, {ID_PROMO, ID_CERVANTES, mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'pro',
    description: 'Relación de enlaces colocados en los canales de promoción de días anteriores, ejemplo: ñpro 2  >> el resultado será de antier',
    async execute(client, message, args) {
        if(!args || args.length < 1) return message.reply(`${mark}Debes colocar un número de días ${down}`) ;
        const embed = Object.assign({}, embedZero);
        embed.title = `relación de mensajes hace ${args[0]} días, según horario UTC \n`;
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
            let collMess = null, last = null;
            const LIM       = 100;
                let size = 0;
            try{
                collMess  = await channel.fetchMessages({limit:LIM });
                last = collMess.last();
                collMess = collMess.filter(filt);
                size    += collMess.size;
                
            }
            catch(e){
                arrayRes[index] = arrayRes[index++] + ' -- ' + size;
                console.log('empty channel')
                continue;
            }
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
        embed.description = `${mark}    ${down}`;
        await sentMessage.edit(`Se escanearon  ${promoCat.size} canales con ${cm} Mensajes encontrados desde hace ${args[0]} días ${mark} ${response} ${down}`, {embed});
        },
};
