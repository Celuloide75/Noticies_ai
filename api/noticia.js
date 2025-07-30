import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Falta la URL" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // O "gpt-3.5-turbo" si vols estalviar crèdit
      messages: [
        {
          role: "system",
          content: "Ets un assistent que resumeix notícies i les categoritza en format JSON."
        },
        {
          role: "user",
          content: `Llegeix la notícia d'aquesta URL: ${url}.

Resumeix la notícia en un màxim de 3 frases i categoritza-la segons aquesta llista:

["Cultura", "Esports", "Guitarra", "Musica", "Art", "Cinema", "Tecnologia", "IA"]

Torna la resposta en format JSON amb aquest esquema:

{
  "resum": "...",
  "categories": ["...", "..."]
}`
        }
      ],
      temperature: 0.4
    });

    const resposta = completion.choices[0].message?.content;

    const parsed = JSON.parse(resposta ?? "");

    return res.status(200).json(parsed);
  } catch (error: any) {
    return res.status(500).json({
      error: "Error processant la resposta d'OpenAI",
      detalls: error.message ?? error.toString()
    });
  }
}
