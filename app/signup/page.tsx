'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signupSchema } from '@/lib/validations/auth';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8, 'Minimum 8 characters required').required('Password is required'),
  role: yup.string().oneOf(['patient', 'doctor']).required(),
});

type FormData = yup.InferType<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const result = await res.json();
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-8 shadow-md rounded max-w-md w-full"
      >
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <input placeholder="Name" {...register('name')} className="input" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input placeholder="Email" {...register('email')} className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          placeholder="Password"
          type="password"
          {...register('password')}
          className="input"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <select {...register('role')} className="input">
          <option value="">Select role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
