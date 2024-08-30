const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "wanted",
    aliases: ["want"],
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    countDown: 5,
    role: 0,
    shortdescription: "wanted frame for fun purpose",
    longDescription: "",
    category: "fun",
    guide: "{pn}wanted @tag @tag"
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length < 2) {
      message.reply("Tag your two friends to invite them in wanted frame");
      return;
    }

    // Add the sender ID to the `mention` array
    mention.push(event.senderID);

    let [one, two, three] = mention;

    try {
      const imagePath = await bal(one, two, three);
      await message.reply({
        body: "𝐂𝐑𝐈𝐌𝐈𝐍𝐄𝐋𝐒 𝐑𝐄𝐂𝐇𝐄𝐑𝐂𝐇𝐄𝐒\n━━━━━━━━━━━━━━━\n 🚫| 𝘈𝘤𝘵𝘪𝘰𝘯:\n 𝐏𝐬𝐲𝐜𝐡𝐨𝐩𝐚𝐭𝐡𝐞𝐬 𝐢𝐧𝐭𝐞𝐫𝐧𝐚𝐭𝐢𝐨𝐧𝐚𝐥𝐬\n━━━━━━━━━━━━━━━\n 📲| 𝘗𝘳𝘪𝘮𝘦:\n❺⓿⓿⓿⓿⓿⓿⓿$",
        attachment: fs.createReadStream(imagePath)
      });
    } catch (error) {
      console.error("Error while running command:", error);
      await message.reply("an error occurred");
    }
  }
};

async function bal(one, two, three) {
  const avatarOne = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const avatarTwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const avatarThree = await jimp.read(`https://graph.facebook.com/${three}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);

  const image = await jimp.read("https://i.ibb.co/Wntnk7Y/image.jpg");
  image.resize(2452, 1226).composite(avatarOne.resize(405, 405), 206, 345).composite(avatarTwo.resize(400, 400), 1830, 350).composite(avatarThree.resize(450, 450), 1010, 315);
  const imagePath = "Wanted.png";
  await image.writeAsync(imagePath);
  return imagePath;
}
