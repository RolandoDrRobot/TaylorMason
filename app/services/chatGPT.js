import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const apiKey = process.env.GPT_API;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const sendMessageToChatGPT = async (message) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    const assistantReply = result.choices[0].message.content;
    console.log('Assistant:', assistantReply);
    return assistantReply;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export { sendMessageToChatGPT };
