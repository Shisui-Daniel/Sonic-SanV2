const axios = require("axios");

module.exports = {
	config: {
		name: "goatmart",
		aliases: ["gm"],
		shortDescription: {
			en: "View items available in the market."
		},
		category: "owner",
		usage: "{p}gm [itemID]",
		version: "1.5",
		role: 0,
		author: "LiANE",
	},
	onStart: async ({ api, event, args, message }) => {
		const serverURL = "https://goatmart.nealianacagara.repl.co";

		try {
			if (!args[0]) {
				api.sendMessage(`웃➣『𝐒𝐇𝐈𝐒𝐔𝐈』ツ 𝐌𝐀𝐑𝐊𝐄𝐓\n━━━━━━━━━━━━━━━━\n=> ${event.body} page < page number >\n━━━━━━━━━━━━━━━━\n=> ${event.body} code < item ID >\n━━━━━━━━━━━━━━━━\n${event.body} show < item ID >\n━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
			} else if (args[0] === "code") {
				const itemID = args[1];
				const response = await axios.get(`${serverURL}/api/items/${itemID}`, {
					params: {
						itemID: itemID
					}
				});
				const code = response.data.code;
				const codeX = await axios.get(response.data.pastebinLink);
const codeExtracted = codeX.data;

				if (code || codeX ) {
					message.reply(`웃➣『𝐒𝐇𝐈𝐒𝐔𝐈』ツ 𝐌𝐀𝐑𝐊𝐄𝐓\n━━━━━━━━━━━━━━━
Item Name: ${response.data.itemName}
Item ID: ${response.data.itemID}
Type: ${response.data.type || 'GoatBot' }
Item Code: 
${codeExtracted }`);
				} else {
					api.sendMessage("Item not found.", event.threadID);
				}
			} else if (args[0] === "page") {
				const pageNumber = parseInt(args[1]);
				const response = await axios.get(`${serverURL}/api/items`);
				const items = response.data;
				const totalPages = Math.ceil(items.length / 5);
				const offset = (pageNumber - 1) * 5;

				if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
					api.sendMessage("Invalid page number.", event.threadID);
				} else {
					const pageItems = items.slice(offset, offset + 5);

					const itemDescriptions = pageItems.map(
						(item) =>
							`Item Name: ${item.itemName}
Item ID: ${item.itemID}
Description: ${item.description}
`
					);
					const itemInfo = itemDescriptions.join(`
`);

					message.reply(`웃➣『𝐒𝐇𝐈𝐒𝐔𝐈』ツ 𝐌𝐀𝐑𝐊𝐄𝐓\n━━━━━━━━━━━━━━━
Items available in the market:

${itemInfo}Use ${event.body.split(" ")[0]} [ show | code ] <item id> to view pastebin link or code.

Page: [ ${pageNumber} / ${totalPages} ]`);
				}
			} else if (args[0] === "show") {
				const itemID = args[1];
				const response = await axios.get(`${serverURL}/api/items/${itemID}`);
				const item = response.data;

				if (item && itemID) {
					message.reply(`웃➣『𝐒𝐇𝐈𝐒𝐔𝐈』ツ 𝐌𝐀𝐑𝐊𝐄𝐓\n━━━━━━━━━━━━━━━
Item Name: ${item.itemName}
Item ID: ${item.itemID}
Type: ${item.type || " GoatBot"}
Description: ${item.description}
Pastebin Link: ${item.pastebinLink}`);
				} else {
					api.sendMessage("Item not found.", event.threadID);
				}
			}
		} catch (error) {
			console.error("Error fetching items:", error);
			api.sendMessage("Invalid Item ID" + error.message, event.threadID);
		}
	},
};
