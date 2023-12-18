import { sendMessageToChatGPT } from './chatGPT.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();



async function getMarketSentiment(category) {
  const apiKey = process.env.CRYPTO_COMPARE;
  const apiUrl = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${category}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Apikey': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

    const data = await response.json();

    let news = ''
    for (let i = 0; i < 8; i++) {
      news = news + '  ' + data.Data[i].body
    }
    const prompt = `Analiza las noticias financieras, explicalas en viñetas  y ordénelas por sentimiento (positivo, neutral, negativo), este es un resumen para inversionistas: ${news}. Respondeme en español con un máximo de 2000 caracteres.`;
    return await sendMessageToChatGPT(prompt);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export { getMarketSentiment };
