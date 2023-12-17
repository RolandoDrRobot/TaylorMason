import { globalTime } from './services/globalTime.js';
import { callVictor } from './MasonAnalytica/victorMateu.js';
import { callBill } from './MasonAnalytica/dollarBill.js';
import { callBen } from './MasonAnalytica/benKim.js';

globalTime();
console.log('');
await callVictor();
console.log('');
await callBill();
// console.log('');
// await callBen();
