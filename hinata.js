const axios = require("axios")
module.exports = {
	config: {
		name: 'hinata',
        aliases: ["hina"],
		version: '1.2',
		author: 'Luxion/fixed by Riley',
		countDown: 0,
		role: 0,
		shortDescription: 'AI CHAT',
		longDescription: {
			en: 'Chat with Xae'
		},
		category: 'Ai chat',
		guide: {
			en: "{pn} <word>: chat with lina"
				+ "\Example:{pn} hi"
		}
	},

	langs: {
		en: {
			turnedOn: "𝑻𝒖 𝒓𝒆𝒈𝒓𝒆𝒕𝒕𝒆𝒓𝒂𝒔 𝒂 𝒂𝒗𝒐𝒊𝒓 𝒇𝒂𝒊𝒕 𝒅𝒖 𝒎𝒂𝒍 𝒂 𝑵𝒂𝒓𝒖𝒕𝒐🙍💔",
			turnedOff: "𝑱'𝒆𝒏 𝒂𝒊 𝒑𝒂𝒔 𝒇𝒊𝒏𝒊 𝒂𝒗𝒆𝒄 𝒕𝒐𝒊💁",
			chatting: "Already Chatting with 𝗟𝗢𝗙𝗧...",
			error: "🌱......𝙄𝙈𝘽𝙀𝘾𝙄𝙇𝙀......🌱"
		}
	},

	onStart: async function ({ args, threadsData, message, event, getLang }) {
		if (args[0] == "parle" || args[0] == "arrête") {
			await threadsData.set(event.threadID, args[0] == "parle", "settings.simsimi");
			return message.reply(args[0] == "parle" ? getLang("turnedOn") : getLang("turnedOff"));
		}
		else if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
        console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
		if (args.length > 1 && !isUserCallCommand && await threadsData.get(event.threadID, "settings.simsimi")) {
			try {
				const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply(getLang("error"));
			}
		}
	}
};

async function getMessage(yourMessage, langCode) {
	const res = await axios.post(
    'https://api.simsimi.vn/v1/simtalk',
    new URLSearchParams({
        'text': yourMessage,
        'lc': 'fr'
    })
);

	if (res.status > 200)
		throw new Error(res.data.success);

	return res.data.message;
      }
