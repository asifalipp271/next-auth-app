'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type FormData = yup.InferType<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const result = await res.json();
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-8 shadow-md rounded max-w-md w-full"
      >
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input placeholder="Email" {...register('email')} className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          placeholder="Password"
          type="password"
          {...register('password')}
          className="input"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
