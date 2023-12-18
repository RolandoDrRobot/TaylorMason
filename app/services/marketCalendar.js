import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

async function marketCalendar(category) {
  const apiUrl = 'https://developers.coinmarketcal.com/v1/events';
  const queryParams = new URLSearchParams({ max: 100, showOnly: category, sortBy: 'date_event_asc' });
  const apiKey = process.env.API_KEY_CAL;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'x-api-key': apiKey
    }
  };

  try {
    const response = await fetch(`${apiUrl}?${queryParams}`, options);

    if (response.ok) {
      const data = await response.json();
      let message = '';

      data.body.forEach(event => {
        const newEvent = `\n🎯 ${event.displayed_date}\n ${event.title.en}\n <${event.source}>\n\n`;
        message += newEvent;
      });

      return message;

    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export { marketCalendar }
