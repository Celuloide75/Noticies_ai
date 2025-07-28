import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, url } = req.body;
  if (!url) return res.status(400).json({ error: "Falta URL" });

  try {
    const response = await axios.get(url);
    const html = response.data;
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').slice(0, 3000);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "Ets un assistent que resumeix notícies de forma clara i breu." },
        { role: "user", content: `Resumeix aquest article:\n\n${text}` }
      ]
    });

    const resum = completion.choices[0].message.content;
    return res.status(200).json({ title, url, resum });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error resumint la notícia" });
  }
}