'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { signupSchema, type SignupFormData } from '@/lib/schemas';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants';

export function SignupForm() {
  const { signup, isLoading } = useAuth();
  const { success, error: showError } = useToast();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    const result = await signup(data, returnTo);

    if (result.success) {
      success(SUCCESS_MESSAGES.SIGNED_UP);
    } else {
      // Check for specific error types
      const errorMessage = result.error?.includes('already registered')
        ? ERROR_MESSAGES.EMAIL_EXISTS
        : (result.error || ERROR_MESSAGES.SIGNUP_ERROR);
      showError(errorMessage);
      // Set form-level error for accessibility
      setError('root', { message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form-level error */}
      {errors.root && (
        <div
          className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm flex items-start gap-3"
          role="alert"
        >
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errors.root.message}</span>
        </div>
      )}

      <Input
        label="Name"
        type="text"
        placeholder="John Doe"
        autoComplete="name"
        error={errors.name?.message}
        disabled={isLoading}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        disabled={isLoading}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        helperText="Password must be at least 8 characters"
        error={errors.password?.message}
        disabled={isLoading}
        {...register('password')}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-secondary">
        Already have an account?{' '}
        <Link
          href={ROUTES.LOGIN}
          className="text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
