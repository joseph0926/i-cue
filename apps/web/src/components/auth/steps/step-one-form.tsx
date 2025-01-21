'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpValues } from '@icue/db/src/schemas/auth.schema';
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
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { signupAction } from '@/actions/signup.action';
import { useDirtyCheck } from '@/hooks/use-dirty-check';

type StepOneFormProps = {
  defaultValues: {
    name: string;
    email: string;
    password: string;
  };
  onSubmitSuccess: (id: string, name: string, email: string) => void;
};

export function StepOneForm({ defaultValues, onSubmitSuccess }: StepOneFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const { isDirty, isSubmitting, errors } = form.formState;

  useWatch({ control: form.control });

  useDirtyCheck(isDirty);

  const onSubmit = async (values: SignUpValues) => {
    form.clearErrors('root');

    try {
      const { data, success, error } = await signupAction(values);

      if (!success && error) {
        form.setError('root', { message: error });
        toast.error(error);
        return;
      }

      if (data) {
        toast.success(
          data.message || '기본 정보가 등록되었습니다. 이메일 인증 스텝으로 이동합니다.'
        );

        onSubmitSuccess(data.user.id, data.user.name || '', data.user.email || '');
      }
    } catch (err: unknown) {
      const errMsg = (err as { message: string })?.message ?? '알 수 없는 오류가 발생했습니다.';
      form.setError('root', { message: errMsg });
      toast.error(errMsg);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {errors.root && (
          <Alert variant="destructive" className="flex items-center">
            <AlertTriangleIcon className="h-5 w-5" />
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input {...field} placeholder="홍길동" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <Input type={showPassword ? 'text' : 'password'} {...field} className="pr-10" />
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

        <Button type="submit" disabled={isSubmitting} className="flex items-center justify-center">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          회원가입
        </Button>
      </form>
    </Form>
  );
}
