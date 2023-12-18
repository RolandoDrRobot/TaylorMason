import { getMarketSentiment } from '../services/marketSentiment.js';
import { sendMessageToChatGPT } from '../services/chatGPT.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import { getLatestNews } from '../services/latestNews.js';
import dotenv from 'dotenv';
dotenv.config();

const victorMateu = {
  username: 'Victor Mateu',
  webhookURL: process.env.VICTORWEBHOOK,
  greetingPrompt: 'crea una variacion de dos parrafos para este mensaje "Hola buenos dias! estuve revisando las noticias mas importantes de las 24 horas y estas son las mas importantes" y agregale un toque de personalidad de un hombre segura, seria e inteligente, estamos hablando en el grupo de discord Taylor Mason, este es un saludo que das todos los dias, usa emoticones tambien, responde solo con el mensaje sin comillas'
}

const greeting = await sendMessageToChatGPT(victorMateu.greetingPrompt);

const callVictor = async () => {
  let sentiment = await getMarketSentiment('BTC');
  let latestNews = await getLatestNews('BTC');
  postOnDiscord(victorMateu, greeting);
  postOnDiscord(victorMateu, sentiment);
  postOnDiscord(victorMateu, latestNews);
}

export { callVictor }
