export const mark = '```markdown\n';
export const down = '\n```';
export const ID_CERVANTES  = "327509431631740928";
export const ID_STEEMPRESS = "469200340906934283";
export const ID_PROMO = "379318331963998218";
export const ID_GRAL  = "432811551368675328";
export const MAX_LIM_MESSAGES  = 100;
const Discord = require('discord.js')
const genEmbed =  {
    "title": "Información que entregas",
    "description": "Resultadao soporta markdown",
    "url": "https://steemit.com/@cervantes",
    "color": 8644874,
    "author":{
        "name": "Moderator",
        "url": "https://steemit.com/@jesuscirino",
        "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/24-cell.gif/120px-24-cell.gif"
    },
    "thumbnail":{
        "url":"http://c1.thejournal.ie/media/2015/03/cervantes-body-found-2-390x285.jpg" 
    },
    "footer":{
        "icon_url":"https://3.bp.blogspot.com/-edxDRZkSNNQ/WoCb_ht9LCI/AAAAAAAAAUA/5HZ80FSoGQcPKR-Gi_B92tgP_T7vCjWfwCLcBGAs/s1600/mod-iloveimg-resized.gif",
        "text":"Equipo de Moderación"
    }

    
};
const dayToSecond  = nDays => nDays * 24 * 3600000;
// nDays => (Fn) is a filter for collections 
export const createdAgo   = nDays => {
                     const today = new Date()   
                     const msec  = dayToSecond(nDays)
                     return (message => (today - message.createdAt) >= msec)
}
// number of days, channel => Promise with message object discord
// return the first message with createdAT >= number of days
const findMessageAgo = async (nDays, channel)=> {
    let messageFound = null
    let lastID = 0
    // verify channel not void
    try{
    const coll = await channel.fetchMessages({limit: 1})
    const lastMessage = coll.last()
    console.log(lastMessage.id)
    lastID = lastMessage.id
    }
    catch(e){
        return null
    }
    let  messages = null
    const filt = createdAgo(nDays)
    do{
        messages = await channel.fetchMessages({limit: MAX_LIM_MESSAGES,
                                                      before: lastID})
        try{
            
        lastID = messages.last().id;
        }
        catch(e){
            continue;
        }
        messageFound = messages.find(filt)
        console.log('find...')
    }while(!messageFound && messages.size >= MAX_LIM_MESSAGES);
    return messageFound
}
export const getLastMessageFrom = async (channel) => {
    return null
}
export const getSteemitLink = (text) => {
    let r = null
    //const pattern = /https:\/\/steemit.com\/\w+\/@\w+\/[\w-]+/
    const pattern = /https:\/\/steemit.com\/[0-9a-z._-]+\/@[0-9a-z._-]+\/[\w._-]+/
    if (pattern.test(text)){
        const post = pattern.exec(text)[0]
        const arrayCont = post.split('/');
        r = {url:post, author:arrayCont[4].replace('@',''), permlink:arrayCont[5] }
    }

    return r
    
    
}
export const getMessagesFrom = async (channel) => {
    if (!channel)
        throw new Error('ChannelNotExist')
    let query = {
        limit: 10
    }
    let c1 = new Discord.Collection()
    let collectionAux = await channel.fetchMessages(query)
    if (collectionAux.size === 0)
        throw new Error('ChannelEmpty')
    while (collectionAux.size){
        c1 = c1.concat(collectionAux).clone()
        query.before = c1.last().id
        collectionAux = await channel.fetchMessages(query)
        console.log(c1.last().id)
        console.log('size',c1.size)
        
    }

    //return channel.lastMessageID
    return c1
}

// number of days, channel => Promise
// erase all messages from channel older that number of days
import {steemGetTags} from "./steemFunc";
export const deleteAllUntilAgo =  async (nDays, channel, steemit, unique, emoID) => {
    //let [size, counter, counTag] = [0 , 0, 0]
    let [size, counter, counTag, steemErr] = [0 , 0, 0, 0]
    let messages = null
    let lastID = null
    const lastMessage = await findMessageAgo(nDays, channel) 
    console.log(channel.name)
    if (!lastMessage) return (steemit ? counTag : counter);

    lastID = lastMessage.id
    messages = await channel.fetchMessages({limit: 4,
                                            around: lastID})
    //console.log(`####CANAL: ${channel.name}`);
    do{
        counter += messages.size
        if (steemit){
            const pattern = /https:\/\/steemit.com\/\w+\/@\w+\/[\w-]+/
            messages.map(async m =>{
                //console.log(m.author.username)
               const {id, content, channel:{name}} = m
                //console.log(content)
                lastID = id
                //if (id === lastID) return;
               if (pattern.test(content)){
                   let post = pattern.exec(content)[0]
                   let arrayCont = post.split('/');
                   let aux = {_id:id, user:arrayCont[4], permlink:arrayCont[5] }
                   let tags = 
                       await steemGetTags(aux.user.replace('@',''),aux.permlink);
                   
                   if(tags){
                        let accept = tags.includes('cervantes') &&
                                 tags.includes(name)        &&
                                 tags.includes('spanish')      ?  true: false;
                        counTag += (accept ? 0 : 1);
                        if (!accept){
                            await m.delete() ;
                            console.log('X');
                        }
                        else{
                           //await m.react('🤖')
                           await m.react(emoID)
                        }
                    console.log(tags, accept)
                   }
                   else{
                           console.log(`ERROR TAGS NULL!!!`)
                           steemErr += 1;
                           //console.log(steemErr)
                   }
               }
            } )
            //console.log(`ERRORES STEEMIT: -->> ${steemErr}`);
        }
        else{
            await Promise.all(messages.deleteAll())
        }
        messages = await channel.fetchMessages({limit: 4,
                                                  before: lastID})
        size = messages.size
    } while(size);
    //while(lastID != nextID);

    return (steemit ? counTag : counter);
    //return counter;
}

export default genEmbed;
