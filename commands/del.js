import embedZero, {mark, down} from "../lib/defaultEmbed";

module.exports = {
    name: 'del',
    description: 'Borra un mensage por id',
    async execute(client, message, args) {
        if(!args || args.size < 1) return  await message.reply("Must provide a command name to reload.");
        const delMessage = await message.channel.fetchMessage(args[0]);
        await delMessage.delete(1000);
        await message.delete(1000);
        },
};
