'use client';

import { signInSchema, type SignInValues } from '@doc-q/db/src/schemas/auth.schema';
import { Alert, AlertDescription } from '@doc-q/ui/src/components/alert';
import { Button } from '@doc-q/ui/src/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@doc-q/ui/src/components/form';
import { Input } from '@doc-q/ui/src/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
      router.push('/');
    } catch (error: unknown) {
      const errMsg = (error as { message?: string })?.message ?? '알 수 없는 오류가 발생했습니다.';
      form.setError('root', { message: errMsg });
      toast.error(errMsg);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">닥큐(DocQ) 로그인</h1>
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
                  <Input {...field} placeholder="user@example.com" />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
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
    </div>
  );
}
