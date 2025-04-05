'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Sign in to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-500 dark:hover:text-primary-400"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="font-medium text-primary-600 hover:text-primary-500 dark:hover:text-primary-400"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}