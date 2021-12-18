import { JokeQuery } from '../@types/index';
import axios from 'axios';
import logger from '../util/logger.util';

const client = axios.create({
  baseURL: 'https://v2.jokeapi.dev/joke',
});

export async function getRandomJoke() {
  const { data } = await client.get('/Programming?type=twopart');
  if (data.error) {
    logger.error(`Could not get random joke: ${data.message}`);
  }
  return data;
}

export async function searchJokes({ search, all, nsfw, count }: JokeQuery) {
  const jokePath = all === 'on' ? 'Any' : 'Programming';
  let jokeQuery = `contains=${search}&amount=${count}&type=twopart&blacklistFlags=religious,racist,sexist`;
  if (nsfw !== 'on') {
    jokeQuery += ',nsfw';
  }
  const { data } = await client.get(`/${jokePath}?${jokeQuery}`);
  if (data.error) {
    logger.error(`Could not search for joke for '${search}': ${data.message}`);
  }
  return data;
}
