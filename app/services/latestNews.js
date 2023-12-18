import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

async function getLatestNews(category) {
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
    let message = '🌞 Estas son las últimas noticas:\n';

    for (let i = 0; i < 10; i++) {
      const newEvent = `\n🐲 ${data.Data[i].title}\n ☁️ <${data.Data[i].url}>\n`;
      message += newEvent;
    }

    return message;

  } catch (error) {
    console.error('Error:', error.message);
  }
}

export { getLatestNews };
