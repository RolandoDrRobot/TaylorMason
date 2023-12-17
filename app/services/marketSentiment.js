import { sendMessageToChatGPT } from './chatGPT.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const apiKey = process.env.CRYPTO_COMPARE;
const apiUrl = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BTC';

async function getMarketSentiment() {
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
    for (let i = 0; i < 10; i++) {
      news = news + '  ' + data.Data[i].body
    }
    const prompt = `Analiza las noticias financieras, resúmalas con viñetas y ordénelas por sentimiento (positivo, neutral, negativo) y dé una explicación: ${news}`;
    return await sendMessageToChatGPT(prompt);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export { getMarketSentiment };
