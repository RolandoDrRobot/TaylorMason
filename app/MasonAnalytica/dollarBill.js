import { sendMessageToChatGPT } from '../services/chatGPT.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import { getQuickPlay } from '../services/quickPlay.js';
import dotenv from 'dotenv';
dotenv.config();

const dollarBill = {
  username: 'Dollar Bill',
  webhookURL: process.env.BILLWEBHOOK,
  greetingPrompt: 'crea una variacion de un parrafo para este mensaje "Hola buenos dias! Estuve analizando la siguiente noticia, y traigo algunos insights para ti" y agregale un toque de personalidad de hombre que le gusta el dinero y generar ganancias, estamos hablando en el grupo de discord Taylor Mason, este es un saludo que das todos los dias, usa emoticones tambien, responde solo con el mensaje sin comillas'
}

const greeting = await sendMessageToChatGPT(dollarBill.greetingPrompt);

const callBill = async () => {
  const { title, message } = await getQuickPlay('BTC', 0);
  // await postOnDiscord(dollarBill, greeting);
  await postOnDiscord(dollarBill, title);
  await postOnDiscord(dollarBill, message);
}

export { callBill }
