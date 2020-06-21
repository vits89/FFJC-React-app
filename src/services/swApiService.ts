const baseUrl = 'https://swapi.dev/api/';

export async function swApiService(endpoint: string, number = 10): Promise<{ [key: string]: any }[]> {
  if (!endpoint) {
    return Promise.resolve(new Array<{ [key: string]: any }>());
  }

  const response = await fetch(`${baseUrl + endpoint}/`);
  const data: { results: { [key: string]: any }[] } = await response.json();

  return data.results.slice(0, number);
}
