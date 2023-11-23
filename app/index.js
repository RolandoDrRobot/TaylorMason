import { globalTime } from './services/globalTime.js';
import { getMarketSentiment } from './services/marketSentiment.js';
import { marketPrices } from './services/marketPrices.js';
import { marketCalendar } from './services/marketCalendar.js';

globalTime();
console.log('');
// await marketCalendar();
// console.log('');
// await getMarketSentiment();
// console.log('');
// await marketPrices();