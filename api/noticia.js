
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { url, titol } = req.body;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const textContent = dom.window.document.body.textContent;

    const prompt = `Resumeix aquesta notícia en català: \n\n${textContent}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const resum = completion.choices[0].message.content;

    res.status(200).json({
      missatge: "✅ Resum generat correctament!",
      titol: titol || "",
      url,
      resum,
    });
  } catch (error) {
    console.error("❌ Error processant la notícia:", error);
    res.status(500).json({ error: "No s'ha pogut generar el resum", details: error.message });
  }
}
