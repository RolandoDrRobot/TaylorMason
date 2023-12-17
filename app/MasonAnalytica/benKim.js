import { marketPrices } from '../services/marketPrices.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import dotenv from 'dotenv';
dotenv.config();

const benKim = {
  username: 'Ben Kim',
  webhookURL: process.env.BENWEBHOOK
}

const callBen = async () => {
  await postOnDiscord(benKim, await marketPrices());
}

export { callBen }