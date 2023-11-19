import { globalTime } from './services/globalTime.js';
import { getMarketSentiment } from './services/marketSentiment.js';
import { marketPrices } from './services/marketPrices.js';

globalTime();
console.log('');
await getMarketSentiment();
console.log('');
await marketPrices();