import { marketCalendar } from '../services/marketCalendar.js';
import { postOnDiscord } from '../services/postOnDiscord.js';
import dotenv from 'dotenv';
dotenv.config();

const dollarBill = {
  username: 'Dollar Bill',
  webhookURL: process.env.BILLWEBHOOK
}

const callBill = async () => {
  await postOnDiscord(dollarBill, await marketCalendar());
}

export { callBill }
