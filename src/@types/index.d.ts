export interface JokeQuery {
  search: string;
  all: string;
  nsfw: string;
  count: string;
}

export interface SearchViewConfig {
  packageJson: {
    version: string;
    description: string;
    author: string;
    license: string;
    packages: string[];
  };
  searchResults?: {
    amount: Number;
    jokes: {
      category: string;
      type: string;
      setup: string;
      delivery: string;
      error?: Boolean;
      message?: string;
    }[];
    error: Boolean;
    message?: string;
  };
}
