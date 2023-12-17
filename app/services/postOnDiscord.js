import fetch from 'node-fetch';

const postOnDiscord = async ({username, webhookURL}, content) => {
  const url = webhookURL;
  const payload = {
    username: username,
    content: content,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error al realizar la solicitud. Código de estado: ${response.status}`);
    }

    console.log('Mensaje enviado con éxito');
  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
  }
};

export { postOnDiscord };
