'use server';

import { cookies } from 'next/headers';

export async function storeCookie(name, value) {
  const stringifiedValue = JSON.stringify(value);

  cookies().set(name, stringifiedValue, {
    path: '/',
    maxAge: 3600, // 1 hour
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
}

export async function retrieveCookie(name) {
  const storedCookie = cookies().get(name);

  if (storedCookie) {
    if (storedCookie.value) {
      return JSON.parse(storedCookie.value);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function deleteCookie(name) {
  cookies().set(name, '', {
    path: '/',
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
}
