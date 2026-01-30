
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '@/types/user-interface';

export async function getUser(): Promise<User | null> {
  noStore();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      console.log('❌ [getUser] No hay token');
      return null;
    }

    const response = await fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token.value}`,
      },
      credentials: 'include',
      cache: 'no-store',
    });


    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    return data.user || data;

  } catch (error) {
    console.error('[getUser] Error:', error);
    return null;
  }
}