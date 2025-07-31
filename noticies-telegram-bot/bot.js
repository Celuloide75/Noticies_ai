require('dotenv').config();
const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Substitueix pel teu ID
const allowedUserId = 411542252;

// Ruta on es guardarà el fitxer resums.json
const RESUMS_PATH = path.join(__dirname, '../web-tailwind/public/resums.json');

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

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error del servidor (${res.status}): ${errorText}`);
      }

      const data = await res.json();

      // Construir nova notícia
      const novaNoticia = {
        titol: data.titol || "Notícia sense títol",
        resum: data.resum || "Sense resum disponible.",
        url: url,
        categories: data.categories || ["Sense categoria"]
      };

      // Llegir fitxer actual
      let noticies = [];
      if (fs.existsSync(RESUMS_PATH)) {
        const raw = fs.readFileSync(RESUMS_PATH);
        noticies = JSON.parse(raw);
      }

      // Evitar duplicats
      const jaExisteix = noticies.some(n => n.url === url);
      if (jaExisteix) {
        bot.sendMessage(chatId, "⚠️ Aquesta notícia ja s'ha afegit prèviament.");
        return;
      }

      // Afegir nova notícia i guardar
      noticies.unshift(novaNoticia); // afegir al principi
      fs.writeFileSync(RESUMS_PATH, JSON.stringify(noticies, null, 2));

      bot.sendMessage(chatId, '✅ Notícia resumida i afegida a la web!');
    } catch (err) {
      console.error("❌ ERROR DETALLAT:", err.message);
      bot.sendMessage(chatId, `❌ Error generant el resum: ${err.message}`);
    }
  } else {
    bot.sendMessage(chatId, "⚠️ No s'ha detectat cap URL al missatge.");
  }
});
