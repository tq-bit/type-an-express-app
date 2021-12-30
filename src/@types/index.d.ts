export type JokePath = 'Any' | 'Programming'

export interface JokeQuery {
  search: string,
  all: string
  nsfw: string,
  count: string
}

export interface AppMetadata {
  version: string,
  description: string,
  author: string,
  license: string
  packages: string[]
}

export interface RandomTwoPartJoke {
  category: string,
  type: string,
  setup: string,
  delivery: string,
  error?: Boolean,
  message?: string
}

export interface MultipleJokesResponse {
  amount: Number,
  jokes: RandomTwoPartJoke[]
  error: Boolean,
  message? : string
}

// Interfaces for View configurations
export interface HomeViewConfig {
  packageJson: AppMetadata
  randomJoke: RandomTwoPartJoke
}

export interface AboutViewConfig {
  packageJson: AppMetadata
}

export interface SearchViewConfig {
  packageJson: AppMetadata,
  searchResults?: MultipleJokesResponse
}