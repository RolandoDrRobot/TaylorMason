import { getMarketSentiment } from '../services/marketSentiment.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import dotenv from 'dotenv';
dotenv.config();

const victorMateu = {
  username: 'Victor Mateu',
  webhookURL: process.env.VICTORWEBHOOK
}

const callVictor = async () => {
  await postOnDiscord(victorMateu, await getMarketSentiment());
}

export { callVictor }
