import { globalTime } from './services/globalTime.js';
import { callVictor } from './MasonAnalytica/victorMateu.js';
import { callBill } from './MasonAnalytica/dollarBill.js';
import { callBen } from './MasonAnalytica/benKim.js';
import { callSacker } from './MasonAnalytica/kateSacker.js';

globalTime();
// await callBen();
// await callVictor();
// await callSacker();
await callBill();
