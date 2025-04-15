import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { signupSchema } from '@/lib/validations/auth';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    // const body = await req.json();

    // await signupSchema.validate(body);
    await connectToDatabase();
    const { name, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    return NextResponse.json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
