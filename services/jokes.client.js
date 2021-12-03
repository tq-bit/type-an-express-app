const axios = require('axios').default;

const client = axios.create({
  baseURL: 'https://v2.jokeapi.dev/joke',
});

async function getRandomJoke() {
  const { data } = await client.get('/Programming?type=twopart');
  return data;
}

module.exports = getRandomJoke;
