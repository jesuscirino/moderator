import embedZero, { mark, down} from "../lib/defaultEmbed";
import {steemEmbedAcc, priceFrom} from "../lib/steemFunc";
module.exports = {
    name: 'pr',
    description: 'Muestra precio de algún token según Coinmarketcap',
    execute: async (client, message, args)  => {
        if(!args || args.length < 1) return message.reply(`${mark}Debes colocar un token válido en coinmarketcap ${down}`)
        let price = null;
        let token = String(args[0]);
        console.log(token);
        const embed = Object.assign({}, embedZero)
        embed.title = `conectado coinmarketcap`
        if (token === 'nelyp') 
            embed.description = `${mark}Nelyp: Mil millones de Unicornios viviendo en las estrellas de este universo!! ${down}`
        else{
            const a = await priceFrom(token)
                .then( r => price = r.price_usd)
            embed.description = `${mark}${token}: ${price} usd ${down}`
            
        }
        const sentMessage = message.channel.send("", {embed})
        }
};
