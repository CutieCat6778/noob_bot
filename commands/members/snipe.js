const MessageEmbed = require("../../classes/newEmbed");

module.exports = {
    config: {
        name: "snipe",
        aliases: ["delmsg", "deletemsg"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"],
        usage: ['[Snipe_number]']
    },
    async execute(client, message, args, guildCache) {
        try {
            let snipe = client.snipe.get(message.channel.id);
            if (!snipe || snipe.length == 0) return message.channel.send("Không có tin nhắn nào đc xóa gần đây !");
            if(!args[0]){
                const embed = new MessageEmbed({
                    "title": "Tin nhắn được xóa gần đây!",
                    "description": `${snipe.map(a => `**[${snipe.indexOf(a) + 1}]** | ${message.guild.members.cache.get(a.author)} | ${require('ms')(client.uptime - a.time, {long: true})} trước`).join('\n')}`,
                    "timestamp": new Date(),
                    "footer": {
                        "text": "được yêu cầu bởi " + message.member.displayName,
                        "icon_url": message.author.displayAvatarURL()
                    }
                })
                const msg = await message.channel.send({embeds: [embed]});
                return setTimeout(() => {
                    message.delete();
                    msg.delete();
                }, 10000);
            }else if(args[0] && !isNaN(args[0]) && parseInt(args[0])){
                const data = snipe[parseInt(args[0] - 1)];
                if(!data) return message.channel.send('không tìm thấy tin nhắn!');
                const embed = new MessageEmbed()
                    .setAuthor(message.guild.members.cache.get(data.author).displayName, message.guild.members.cache.get(data.author).user.displayAvatarURL())
                    .setDescription(data.content + `${data.attachments ? `\n\n${data.attachments.join('\n')}` : ''}`)
                    .setFooter(`cách đây ${require('ms')(client.uptime, data.time, {long: true})}`)
                if(data.attachments) embed.setImage(data.attachments[0]);
                return data.embeds ? message.channel.send('Đã tìm thấy một cái embed!',{embeds: data.embeds}) : message.channel.send({embeds: [embed]});
            }
        } catch (e) {
            return require("../../tools/functions/error")(e, message)
        }
    }
}