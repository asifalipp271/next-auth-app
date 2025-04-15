// lib/validations/auth.ts
import * as yup from 'yup';

export const signupSchema = yup.object({
  name: yup.string().required('Name is required').min(3).max(50),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
role: yup.string().oneOf(['patient', 'doctor']).required()
});

export const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
});
