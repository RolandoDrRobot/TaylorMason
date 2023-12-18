import { sendMessageToChatGPT } from '../services/chatGPT.js';
import { marketCalendar } from '../services/marketCalendar.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import dotenv from 'dotenv';
dotenv.config();

const benKim = {
  username: 'Ben Kim',
  webhookURL: process.env.BENWEBHOOK,
  greetingPrompt: 'crea una variacion de dos parrafos para este mensaje "Hola buenos dias! estas son los hot, significant and trending eventos del espacio crypto para los siguientes 7 dias" y agregale un toque de personalidad de un hombre inseguro y amable, estamos hablando en el grupo de discord Taylor Mason, este es un saludo que das todos los dias, usa emoticones tambien'
}

const createCalendarPrompt = async () => {
  const trendingEvents = await marketCalendar('trending_events')
  const significatnEvents = await marketCalendar('significant_events')
  const hotEvents = await marketCalendar('hot_events');
  return `Haz un resumen de los eventos mas importantes ordenados por fechas, que sea facil de leer y que incluya los links, no cuentes los repetidos, responde con menos de 2000 caracteres, usa pocos emoticones, no pongas el mensaje inicial y que los eventos esten en viñetas, incluye los link entre los simbolos <>: ${ trendingEvents } ${significatnEvents } ${ hotEvents }`
}
const prompt = await createCalendarPrompt();

const callBen = async () => {
  await postOnDiscord(benKim, await sendMessageToChatGPT(benKim.greetingPrompt));
  await postOnDiscord(benKim, await sendMessageToChatGPT(prompt));
}

export { callBen }
