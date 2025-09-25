import { request } from './request';

export async function loginUser(email: string, password: string) {
  const response = await request('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function registerUser(email: string, password: string) {
  const response = await request('auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}
