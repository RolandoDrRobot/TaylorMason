import { globalTime } from './services/globalTime.js';
import { callVictor } from './MasonAnalytica/victorMateu.js';
import { callBill } from './MasonAnalytica/dollarBill.js';
import { callSacker } from './MasonAnalytica/kateSacker.js';
import { callChuck } from './MasonAnalytica/chuckRhodes.js';
import { callBen } from './MasonAnalytica/benKim.js';

globalTime();
// await callVictor();
await callBill();
// await callSacker();
// await callChuck();
// await callBen();
