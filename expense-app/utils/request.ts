/// <reference lib="dom" />

export const BASE_URL = 'http://192.168.0.186:4001/api';

type Init = RequestInit & {
  fetchErrorMessage?: string;
  retryDelay?: (
    attempt: number,
    error: Error | null,
    response: Response | null
  ) => number;
  retryOn?: (
    attempt: number,
    error: Error | null,
    response: Response | null
  ) => boolean;
  retries?: number;
};

export class RequestError {
  constructor(
    public message: string | undefined,
    public error: Error
  ) {}
}

export async function request(
  url: string,
  init: Init = {},
  handleErrorFn = handleFailedResponse
): Promise<Response> {
  applyDefaults(init);

  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}/${url}`;

  console.debug('Making request to:', fullUrl);

  let response: Response;
  try {
    response = await fetch(fullUrl, init);
  } catch (error) {
    console.debug(error);
    throw new RequestError(init.fetchErrorMessage, error as Error);
  }

  if (!response.ok) {
    await handleErrorFn(response);
  }

  return response;
}

function applyDefaults(init: Init) {
  init.fetchErrorMessage ??=
    'Some of our backend services are currently unreachable. Please try again later.';
}

async function handleFailedResponse(response: Response) {
  let error: unknown;
  try {
    error = await response.json();
  } catch {
    error = new Error(
      'Some of our backend services are currently unreachable. Please try again later.'
    );
  }
  throw error;
}
