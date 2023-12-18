import { getMarketSentiment } from '../services/marketSentiment.js';
import { sendMessageToChatGPT } from '../services/chatGPT.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const kateSacker = {
  username: 'Kate Sacker',
  webhookURL: process.env.KATEWEBHOOK,
  greetingPrompt: 'crea una variacion de dos parrafos para este mensaje "Hola buenos dias! estuve revisando las noticias regulatorias mas importantes de las 24 horas y estas son" y agregale un toque de personalidad de mujer segura, seria e inteligente, estamos hablando en el grupo de discord Taylor Mason, este es un saludo que das todos los dias, usa emoticones tambien, responde solo con el mensaje sin comillas'
}

// const greeting = await sendMessageToChatGPT(kateSacker.greetingPrompt);

const callSacker = async () => {
  let aiResponse = await getMarketSentiment('REGULATION');
  await rl.question('\na) Género un nuevo análisis? b) Público el análisis anterior? x) No hago nada: ', (answer) => {
    if (answer == 'a') callSacker();
    if (answer == 'b') {
      postOnDiscord(kateSacker, greeting);
      postOnDiscord(kateSacker, aiResponse);
    }
    if (answer == 'x') rl.close();
  });
}

export { callSacker }
