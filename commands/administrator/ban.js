module.exports = {
	config: {
		name: "ban",
		aliases: ['cấm', 'cút'],
		perms: ['BAN_MEMBERS'],
		bot: ['BAN_MEMBERS'],
		category: 'administrator',
		usage: ['text']
	},
	async execute(client, message, args, guild) {
		try {
			if(!args[0]) return;
      if(args[1]){
        for(const arg of args) {
		const id = require('mention-converter')(arg);
		const user = message.guild.members.cache.get(id);
		if(!user) return message.channel.send("Em lạy chị, hãy cho em đúng người mà bạn");
          message.guild.members.ban(user.id, {reason: `Được ban bởi ${message.member.displayName}`});
        }
        return message.reply(`Đã ban: **\`${args.join('\`**, **\`')}\`**`);
      }else if(!args[1]){
        message.guild.members.ban(args[0], {reason: `Được ban bởi ${message.member.displayName}`});
        return message.reply(`Đã ban: **\`${args.join('\`**, **\`')}\`**`);
      }
		} catch (e) {
			return require("../../tools/functions/error")(e, message)
		}
	}
}
