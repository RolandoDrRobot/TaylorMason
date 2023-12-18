import { getMarketSentiment } from '../services/marketSentiment.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const victorMateu = {
  username: 'Victor Mateu',
  webhookURL: process.env.VICTORWEBHOOK
}

const callVictor = async () => {
  let aiResponse = await getMarketSentiment();
  await rl.question('\na) Género un nuevo análisis? b) Público el análisis anterior? x) No hago nada: ', (answer) => {
    if (answer == 'a') callVictor();
    if (answer == 'b') postOnDiscord(victorMateu, aiResponse);
    if (answer == 'x') rl.close();
  });
}

export { callVictor }
