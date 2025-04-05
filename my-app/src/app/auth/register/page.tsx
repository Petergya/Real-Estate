'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await registerUser(data.name, data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Create a new account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full name"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Email address"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            label="Confirm password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-primary-600 hover:text-primary-500 dark:hover:text-primary-400"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}