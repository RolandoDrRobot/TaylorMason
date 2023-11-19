import { globalTime } from './services/globalTime.js';
import { getMarketSentiment } from './services/marketSentiment.js';
import { marketPrices } from './services/marketPrices.js';

globalTime();
console.log('');
await marketPrices();
console.log('');
await getMarketSentiment();