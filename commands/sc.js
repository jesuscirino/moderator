import embedZero, { mark, down} from "../lib/defaultEmbed";
import {steemEmbedAcc, priceFrom} from "../lib/steemFunc";
module.exports = {
    name: 'sc',
    description: 'Muestra resumen de una cuenta en steemit.',
    execute: async (client, message, args)  => {
        if(!args || args.length < 1) return message.reply(`${mark}Debes colocar un nombre de usuario steemit ${down}`)
        let steem = null, sbd = null
        const embed = Object.assign({}, embedZero)
        embed.title = `conectando steemit`
        const a = await priceFrom('steem')
            .then( r => steem = r.price_usd)
        const b = await priceFrom('steem-dollars')
            .then( r => sbd = r.price_usd)
        
        embed.description = `${mark}$[STEEM: ${steem} usd](SBD: ${sbd} usd) ${down}`
        await steemEmbedAcc(args[0], embed)
        const sentMessage = message.channel.send("", {embed})
        }
};
