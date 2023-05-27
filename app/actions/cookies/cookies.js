'use server';

import { cookies } from 'next/headers';
// import { revalidatePath } from 'next/cache';

export async function storeCookie(name, value) {
  await cookies().set(name, value);
}

export async function retrieveCookie(name) {
  return cookies().get(name);
}
