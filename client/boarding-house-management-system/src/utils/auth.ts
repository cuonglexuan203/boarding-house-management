'use server';
import { cookies } from 'next/headers';
import { IAuthResponse } from './types';

export async function setJwtAuthToken(data: IAuthResponse) {
  const { token, expiresIn } = data;
  const cookieOptions = {
    httpOnly: false,
    secure: true,
    sameSite: 'strict',
    maxAge: expiresIn,
    path: '/',
  };

  //   @ts-ignore
  cookies().set('jwtToken', token, cookieOptions);
}
