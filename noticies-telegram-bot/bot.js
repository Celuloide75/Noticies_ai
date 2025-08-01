require('dotenv').config();
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const allowedUserId = 411542252;
const RESUMS_PATH = path.join(__dirname, '../public/resums.json');

bot.on('message', async (msg) => {
  console.log("👉 ID usuari:", msg.from.id);
  const chatId = msg.chat.id;
  const text = msg.text;

  if (msg.from.id !== allowedUserId) {
    console.log(`❌ Accés denegat a l'usuari ${msg.from.username || msg.from.id}`);
    return;
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text?.match(urlRegex);

  if (urls && urls.length > 0) {
    const url = urls[0];
    bot.sendMessage(chatId, '🔄 Generant resum de la notícia...');

    try {
      const res = await fetch('https://noticies-ai.vercel.app/api/noticia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(`Resposta no és JSON vàlid: ${text}`);
      }

      if (!data.resum || !data.titol) {
        throw new Error("Resposta JSON sense resum o títol.");
      }

      const novaNoticia = {
        titol: data.titol,
        resum: data.resum,
        url: url
      };

      let noticies = [];
      if (fs.existsSync(RESUMS_PATH)) {
        const raw = fs.readFileSync(RESUMS_PATH);
        noticies = JSON.parse(raw);
      }

      noticies.unshift(novaNoticia);
      fs.writeFileSync(RESUMS_PATH, JSON.stringify(noticies, null, 2));
      bot.sendMessage(chatId, '✅ Notícia resumida i afegida a la web!');
    } catch (err) {
      console.error("❌ ERROR DETALLAT:", err);
      bot.sendMessage(chatId, `❌ Error processant la notícia:\n${err.message}`);
    }
  } else {
    bot.sendMessage(chatId, "⚠️ No s'ha detectat cap URL al missatge.");
  }
});
