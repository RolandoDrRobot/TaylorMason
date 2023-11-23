import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const apiUrl = 'https://developers.coinmarketcal.com/v1/events';
const queryParams = new URLSearchParams({ max: 100, showOnly: 'trending_events', sortBy: 'date_event_asc' });
const apiKey = process.env.API_KEY_CAL;

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Accept-Encoding': 'deflate, gzip',
    'x-api-key': apiKey
  }
};

async function marketCalendar() {
  try {
    const response = await fetch(`${apiUrl}?${queryParams}`, options);

    if (response.ok) {
      const data = await response.json();
      console.log('Retreiving next trending events...');
      data.body.forEach(event => {
        console.log('')
        console.log(event.displayed_date);
        console.log(event.title.en);
        console.log(event.proof);
        console.log(event.source);
      });

    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export { marketCalendar }

// Categories
// {
//   body: [
//     { id: 1, name: 'Release' },
//     { id: 2, name: 'Branding' },
//     { id: 3, name: 'Tokenomics' },
//     { id: 4, name: 'Exchange' },
//     { id: 5, name: 'Conference' },
//     { id: 6, name: 'Meetup' },
//     { id: 7, name: 'Other' },
//     { id: 8, name: 'Airdrop/Snapshot' },
//     { id: 9, name: 'AMA' },
//     { id: 11, name: 'Partnership' },
//     { id: 13, name: 'Roadmap Update' },
//     { id: 14, name: 'Fork/Swap' },
//     { id: 15, name: 'Whitepaper Update' },
//     { id: 16, name: 'Team Update' },
//     { id: 17, name: 'Staking/Farming' },
//     { id: 18, name: 'Integration' }
//   ]
// }
