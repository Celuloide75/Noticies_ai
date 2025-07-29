
# 🤖 Bot de Telegram - Notícies AI

Aquest bot rep URL per Telegram i les envia al teu backend per generar un resum automàticament.

## 📦 Instruccions

1. Crea un bot amb [@BotFather](https://t.me/BotFather) i copia el token.
2. Crea un fitxer `.env` amb:
   ```
   TELEGRAM_BOT_TOKEN=el_teu_token
   ```
3. Instal·la les dependències:
   ```bash
   npm install
   ```
4. Executa el bot:
   ```bash
   npm start
   ```

Quan comparteixis un enllaç al grup, el bot el detectarà i l'enviarà a:
`https://noticies-ai.vercel.app/api/noticia`

## ✨ Format esperat de resposta

El teu backend ha de retornar JSON amb una clau `resum` per mostrar el text al xat.
