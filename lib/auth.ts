import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret';

export async function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const user = jwt.verify(token, SECRET) as {
      _id: string;
      email: string;
      name: string;
      role: string;
    };
    return user;
  } catch (e) {
    return null;
  }
}
