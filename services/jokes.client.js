const axios = require('axios').default;

const client = axios.create({
  baseURL: 'https://v2.jokeapi.dev/joke',
});

async function getRandomJoke() {
  const { data } = await client.get('/Programming?type=twopart');
  return data;
}

async function searchJokes({ search, all, nsfw, count }) {
  const jokePath = all === 'on' ? 'Any' : 'Programming';
  let jokeQuery = `contains=${search}&amount=${count}&type=twopart&blacklistFlags=religious,racist,sexist`;
  if (nsfw !== 'on') {
    jokeQuery += ',nsfw';
  }
  const { data } = await client.get(`/${jokePath}?${jokeQuery}`);
  return data;
}

module.exports = { getRandomJoke, searchJokes };
