const fs = require('fs');

module.exports = {
  config: {
    name: "ai",
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡", // don't change credits 
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "reply",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
   const link = [
"https://i.ibb.co/jgkqR4T/image.jpg",
"https://i.ibb.co/K76njFh/image.jpg",
"https://i.ibb.co/v3xLd9V/image.jpg",
"https://i.ibb.co/3MKvMJS/image.jpg",
]
  let img =
link[Math.floor(Math.random()*link.length)]
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "ai":
          const replies = [
            "📣| 𝐄𝐬𝐩𝐞𝐜𝐞 𝐝𝐞 𝐒𝐚𝐥𝐨𝐩𝐚𝐫𝐝 🖕👽🖕 𝐚𝐩𝐩𝐞𝐥𝐥𝐞𝐬 𝐩𝐚𝐫 𝐒𝐨𝐧𝐢𝐜...𝐩𝐚𝐬 𝐚𝐢 !",
          ];
          api.setMessageReaction("🖕", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
attachment: await global.utils.getStreamFromURL(img)})
          break;
        default:
          return; 
      }
    }
  },
};
