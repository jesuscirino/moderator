var s = require ('steem');
var rp = require('request-promise')
export const priceFrom = async (coin) => {
    const uri= `https://api.coinmarketcap.com/v1/ticker/${coin}/`
    const op = {
        'uri': uri,
        'headers':{
        'User-Agent': 'Request-Promise'
    },
        'json': true
    }
    const res = await  rp(op)
    return res[0]
        
} 

const STEEWAIT = 950

const steemRes = (steemFunction, query) => {
    let   response = null
    const getRes = (e, r) => response = r
    return new Promise( (resolve, reject) => {
        steemFunction(query, getRes)
        setTimeout(() =>response && resolve(response) ||
            reject(Error('steem Long Time')), STEEWAIT)
    } )
}
const steemRes2 = (steemFunction, param1, param2) => {
    let   response = null
    const getRes = (e, r) => response = r
    return new Promise( (resolve, reject) => {
        steemFunction(param1, param2, getRes)
        setTimeout(() =>response && resolve(response) ||
            reject(Error('steem Long Time')), STEEWAIT)
    } )
}
const steemExistUser = (userName) => {
    let   response = null
    const getRes = (e, r) => response = r
    return new Promise( (resolve, reject) => {
        s.api.lookupAccounts(userName, 1, getRes)
        setTimeout(() =>{
            if(response == null) reject(Error('steem Long Time'))
            else if (response.length > 0 && response[0] == userName)
                resolve(true)
            else
                resolve(false)
        } , STEEWAIT)
    } )
}
export const steemGetTags = async (author, permlink) => {
    try{
        const post = await steemRes2(s.api.getContent, author, permlink);
        let tag = ''
        try{
            tag = JSON.parse(post.json_metadata).tags
        }
        catch(error){
            tag = post.json_metadata
        }
    //console.log('+++++++++++++')
    return tag;
    }
    catch(error){
        console.log(error)
        return null
    }
    
}
export const steemEmbedAcc = async (userName, embed) => {
    const account = await steemRes(s.api.getAccounts, [userName]);
    await (async (embed)=>{
        const ac = account[0]
        const profile = JSON.parse(ac.json_metadata).profile
        const reputation = s.formatter.reputation(ac.reputation)
        let proxy = ac.proxy ? ac.proxy : 'no tiene'
        let about = profile.about ? profile.about : '(vacío)'
    console.log(profile )
        embed.image = {
           "url":profile.profile_image
        }
        embed.author.name = ac.name
        embed.author.url  = `https://steemit.com/@${ac.name}`
        embed.fields = [
            {
                "name": "proxy:", "value":proxy, "inline": true
            },
            {
                "name": "creado desde:", "value":ac.created, "inline": true
            },
            {
                "name": "balance:", "value":ac.sbd_balance, "inline": true
            },
            {
                "name": "reputación:", "value":reputation, "inline": true
            },
            {
                "name": "nombre:", "value":profile.name, "inline": true
            },
            {
                "name": "acerca de:", "value":about, "inline": true
            }
        ]
    })(embed)
    return 1
}
