import { sendMessageToChatGPT } from './chatGPT.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

async function getQuickPlay(category, index) {
  const apiKey = process.env.CRYPTO_COMPARE;
  const apiUrl = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=latest&categories=${category}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Apikey': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

    const data = await response.json();
    const prompt = `Respondeme en español en menos de 1000 letras. Analiza esta noticia, crea para mi una estrategia de inversion avanzada que pueda aprovechar la informacion en esta noticia: ${data.Data[index].body}.`;
    const title = `\n\n🐲 ${data.Data[index].title}\n ☁️ ${data.Data[index].url}\n\n`;
    const message = await sendMessageToChatGPT(prompt);
    return { title, message };
} catch (error) {
    console.error('Error:', error.message);
  }
}

export { getQuickPlay };
