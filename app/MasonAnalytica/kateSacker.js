import { getMarketSentiment } from '../services/marketSentiment.js';
import { getLatestNews } from '../services/latestNews.js';
import { sendMessageToChatGPT } from '../services/chatGPT.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import dotenv from 'dotenv';
dotenv.config();

const kateSacker = {
  username: 'Kate Sacker',
  webhookURL: process.env.KATEWEBHOOK,
  greetingPrompt: 'crea una variacion de dos parrafos para este mensaje "Hola buenos dias! estuve revisando las noticias regulatorias mas importantes de las 24 horas y estas son" y agregale un toque de personalidad de mujer segura, seria e inteligente, estamos hablando en el grupo de discord Taylor Mason, este es un saludo que das todos los dias, usa emoticones tambien, responde solo con el mensaje sin comillas'
}

const greeting = await sendMessageToChatGPT(kateSacker.greetingPrompt);

const callSacker = async () => {
  let sentiment = await getMarketSentiment('REGULATION');
  let latestNews = await getLatestNews('REGULATION');
  await postOnDiscord(kateSacker, greeting);
  await postOnDiscord(kateSacker, sentiment);
  await postOnDiscord(kateSacker, latestNews);
}

export { callSacker }
