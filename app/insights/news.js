import { sendMessageToChatGPT } from './chatGPT.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const apiKey = process.env.CRYPTOCOMPARE;
const apiUrl = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BTC';

async function getCryptoNews() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Apikey': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    let news = ''
    // data.Data.forEach(element => {
    //   news = news + '  ' + element.body
    // });
    for (let i = 0; i < 10; i++) {
      news = news + '  ' + data.Data[i].body
    }
    const prompt = `Analyze the financial news, resume It with bulletpoints and sort them by sentiment (positive, neutral, negative) and give an explanation:  ${news}`;
    console.log(prompt);
    console.log('');
    console.log('');
    console.log('');
    const chatGPTResponse = await sendMessageToChatGPT(prompt);
    console.log('');
    console.log('');
    console.log('');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export { getCryptoNews };
