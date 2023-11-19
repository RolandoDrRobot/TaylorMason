import ccxt from 'ccxt';
import { Console } from 'node:console'
import { Transform } from 'node:stream'
import { sendMessageToChatGPT } from './chatGPT.js';

const marketPrices = async () => {
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })

  function getTable (data) {
    logger.table(data)
    return (ts.read() || '').toString()
  }

  const binanceInstance = ccxt['binance'];
  const binance  = new binanceInstance();
  const tickers = await binance.fetchTickers(['BTC/USDT', 'ETH/USDT', 'XRP/USDT', 'BNB/USDT', 'SOL/USDT', 'DOT/USDT']);
  const table = getTable(tickers);
  
  console.table(tickers);
  console.log('');
  const prompt = `analyze the data of the following table and separate in bulletpoints the most important insights per coins and compare them: ${table}`;
  const chatGPTResponse = await sendMessageToChatGPT(prompt);
}

export { marketPrices };
