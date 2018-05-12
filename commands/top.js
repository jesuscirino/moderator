import embedZero, {ID_CERVANTES, ID_GRAL, mark, down} from "../lib/defaultEmbed";
const Discord = require('discord.js');
module.exports = {
    name: 'top',
    description: 'Obtiene el top de usuarios activos mensajeros desde un núm. de días dado. Ejemplo: ñtop 1 5 id_canal_deseado',
    async execute(client, message, args) {
        if(!args || args.length < 3) return  await message.reply(`${mark} Debes poner un número de días  seguido de número de usuarios al top y el id del canal${down}`);
        const TOP = Number(args[1]);
        const embed = Object.assign({}, embedZero);
        const cervantes = client.guilds.get(ID_CERVANTES);
        //const chatGral  = cervantes.channels.get(ID_GRAL);
        const chatGral  = cervantes.channels.get(args[2]);
        const LIM       = 100;
        const today = new Date();
        const msec  = args[0] * 24 * 3600000;
        const setUsers  = new Set();
        let collMess  = await chatGral.fetchMessages({limit:LIM });
        let last = collMess.last();
        const sentMessage = await message.channel.send(`unos segunditos 😅`);
        let emoticon = '😌', cm = LIM;
        let mapReg = new Discord.Collection();
        do  {
            emoticon = emoticon === '😎' ? '😌' : '😎';
            let idsUsers = collMess.map(m => m.author.id)
            for(let n of idsUsers)
                if (mapReg.has(n) ){
                    let c = mapReg.get(n); mapReg.set(n,++c);
                } 
                else mapReg.set(n,1) ;
            collMess = await chatGral.fetchMessages({limit: LIM, before:last.id });
        //    console.log(`${cm} mensajes en ${last.createdAt} -- ${last.author.username}`)
            await sentMessage.edit(`${emoticon} ${mark} ... procesados ${cm} mensajitos ...${down}`);
            last     = collMess.last();
            cm      += LIM; 

        }while((today - last.createdAt) <= msec);
        embed.title = `El total de usuarios __activos__ desde hace ${args[0]} días en ${chatGral.name} es:`;
        //embed.description = `${mark}  ${setUsers.size}  ${down}`;
        //Order
        //deleting to loreenna
        mapReg.set('273610112457768960',-1);
        mapReg = mapReg.sort( );
        //mapReg.forEach((value, key) => console.log(` ${key}---${value}`))
        let arrayRank  = mapReg.last(TOP);
        let arrayUsers = mapReg.lastKey(TOP);
        arrayUsers=arrayUsers.map(id => id = chatGral.members.get(id).user.username)
        let strResult  = '';
        for (let i = TOP - 1; i >= 0; i-- ){
           strResult += arrayUsers[i] + ' --- ' + arrayRank[i] + ' \n';
        }
        console.log(strResult);
        embed.description = `${mark}${strResult} 
        revisé un paquete de ${cm} mensajitos aprox${down}`;
        sentMessage.edit(`${today}`, {embed});
        },
};
