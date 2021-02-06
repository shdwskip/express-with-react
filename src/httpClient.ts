const get = (endpoint: string): Promise<Response> => fetch(endpoint);

const post = (endpoint: string, body: unknown): Promise<Response> =>
  fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

const httpClient = {
  get,
  post,
};

export default httpClient;
