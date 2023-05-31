'use server';

import { cookies } from 'next/headers';

export async function storeCookie(name, value) {
  const stringifiedValue = JSON.stringify(value);

  cookies().set(name, stringifiedValue);
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
  cookies().delete(name);
}
