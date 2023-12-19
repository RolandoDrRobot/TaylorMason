import { sendMessageToChatGPT } from '../services/chatGPT.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import { getQuickPlay } from '../services/quickPlay.js';
import dotenv from 'dotenv';
dotenv.config();

const chuckRhodes = {
  username: 'Chuck Rhodes',
  webhookURL: process.env.CHUCKWEBHOOK,
  greetingPrompt: 'crea una variacion de un parrafo para este mensaje "Hola buenos dias! Estuve analizando la siguiente noticia, y traigo algunos insights para ti" y agregale un toque de personalidad de hombre que es respetuoso de la ley y que cree en la justicia, estamos hablando en el grupo de discord Taylor Mason, este es un saludo que das todos los dias, usa emoticones tambien, responde solo con el mensaje sin comillas'
}

const greeting = await sendMessageToChatGPT(chuckRhodes.greetingPrompt);

const callChuck = async () => {
  const { title, message } = await getQuickPlay('REGULATION');
  await postOnDiscord(chuckRhodes, greeting);
  await postOnDiscord(chuckRhodes, title);
  await postOnDiscord(chuckRhodes, message);
}

export { callChuck }
