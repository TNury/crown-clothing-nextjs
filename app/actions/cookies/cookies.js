'use server';

import { cookies } from 'next/headers';

export async function storeCookie(name, value) {
  const stringifiedValue = JSON.stringify(value);

  cookies().set(name, stringifiedValue);
}

export async function retrieveCookie(name) {
  const storedCookie = cookies().get(name);

  return JSON.parse(storedCookie.value);
}
