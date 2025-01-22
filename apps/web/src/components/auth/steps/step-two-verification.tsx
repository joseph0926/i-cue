'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { verifyCodeSchema, VerifyCodeValues } from '@icue/db/src/schemas/auth.schema';
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@icue/ui/src/components/input-otp';
import { AlertTriangleIcon, Loader2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { useDirtyCheck } from '@/hooks/use-dirty-check';

type StepTwoVerificationProps = {
  userEmail: string;
  onSubmitCode: (code: string) => void;
  onResendEmail: () => void;
};

export function StepTwoVerification({
  userEmail,
  onSubmitCode,
  onResendEmail,
}: StepTwoVerificationProps) {
  const form = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const { isDirty } = form.formState;

  useWatch({ control: form.control });

  useDirtyCheck(isDirty);

  const handleSubmit = (data: VerifyCodeValues) => {
    onSubmitCode(data.code);
  };

  return (
    <div>
      <p className="text-foreground/60 mb-4 text-sm">
        <span className="font-medium">{userEmail}</span> 주소로 발송된 인증 코드를 입력해주세요.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          {form.formState.errors.code && (
            <Alert variant="destructive" className="flex items-center gap-4">
              <AlertTriangleIcon className="h-5 w-5" />
              <AlertDescription>{form.formState.errors.code.message}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>인증코드</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-rose-600 dark:text-rose-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="default"
            disabled={form.formState.isSubmitting}
            className="flex items-center justify-center py-2.5 font-semibold"
          >
            {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            인증 확인
          </Button>
        </form>
      </Form>

      <div className="mt-4">
        <Button variant="outline" onClick={onResendEmail} disabled={!userEmail}>
          인증 메일 다시 보내기
        </Button>
      </div>
    </div>
  );
}
