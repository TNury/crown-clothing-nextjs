'use server';

import { cookies } from 'next/headers';

export async function storeCookie(name, value) {
  cookies().set(name, value);
}

export async function retrieveCookie(name) {
  cookies().get(name);
}
