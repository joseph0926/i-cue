'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInValues } from '@icue/db/src/schemas/auth.schema';
import { Alert, AlertDescription } from '@icue/ui/src/components/alert';
import { Button } from '@icue/ui/src/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@icue/ui/src/components/form';
import { Input } from '@icue/ui/src/components/input';
import { AlertTriangleIcon, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ROUTES } from '@/constants/routes';

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: SignInValues) => {
    form.clearErrors('root');

    try {
      const result = await nextAuthSignIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        form.setError('root', { message: result.error });
        toast.error(result.error);
        return;
      }

      toast.success('로그인에 성공했습니다.');
      router.push(ROUTES.HOME);
    } catch (error: unknown) {
      const errMsg = (error as { message?: string })?.message ?? '알 수 없는 오류가 발생했습니다.';
      form.setError('root', { message: errMsg });
      toast.error(errMsg);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">아이큐(ICue) 로그인</h1>
      <p className="text-foreground/60 mb-6 mt-1">
        병원 대기 시간을 효율적으로 관리하여 환자에게 실시간 알림과 편리한 진료 환경을 제공하는
        스마트 대기열 솔루션입니다.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {errors.root && (
            <Alert variant="destructive" className="flex items-center">
              <AlertTriangleIcon className="h-5 w-5" />
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="user@example.com"
                    className="placeholder:text-black/50 placeholder:dark:text-white/50"
                  />
                </FormControl>
                <FormMessage className="text-rose-600 dark:text-rose-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type={showPassword ? 'text' : 'password'} className="pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-rose-600 dark:text-rose-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            로그인
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <span className="text-foreground/60">아직 계정이 없으신가요? </span>
        <button
          onClick={() => router.push(ROUTES.SIGNUP)}
          className="text-primary inline-flex items-center hover:underline"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
