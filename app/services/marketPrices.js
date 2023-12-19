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
  
  const prompt = `Anuncia los precios de las siguientes criptomonedas y separalos en viñetas por moneda y compáralos usando la siguiente tabla, incluye solo Percentage y Bid, usa emoticones: ${table}`;
  return await sendMessageToChatGPT(prompt);
}

export { marketPrices };
