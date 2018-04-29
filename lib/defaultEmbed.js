export const mark = '```markdown\n';
export const down = '\n```';
export const ID_CERVANTES = "327509431631740928";
export const ID_PROMO = "379318331963998218";
export const ID_GRAL  = "432811551368675328";
export const MAX_LIM_MESSAGES  = 100;
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
    console.log(channel.messages)
    let lastID       = channel.lastMessageID
    // verify channel not void
    try{
    const lastMessage = await channel.fetchMessage(lastID)
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

// number of days, channel => Promise
// erase all messages from channel older that number of days
export const deleteAllUntilAgo =  async (nDays, channel) => {
    let [size, counter] = [0 , 0]
    let messages = null
    let lastID = null
    const lastMessage = await findMessageAgo(nDays, channel) 
    if (!lastMessage) return counter;
    lastID = lastMessage.id
    do{
        messages = await channel.fetchMessages({limit: 4,
                                                      before: lastID})
        size = messages.size
        counter += messages.size
        await Promise.all(messages.deleteAll())
        console.log(counter)
    }while(size);

    return counter;
}


export default genEmbed;
