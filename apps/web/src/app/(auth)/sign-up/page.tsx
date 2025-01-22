'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { createProfileAction } from '@/actions/signup.action';
import { resendVerificationAction, verifyEmailCodeAction } from '@/actions/verfiy.action';
import { StepIndicator } from '@/components/auth/step-indicator';
import { StepOneForm } from '@/components/auth/steps/step-one-form';
import { StepThreeProfile } from '@/components/auth/steps/step-three-profile';
import { StepTwoVerification } from '@/components/auth/steps/step-two-verification';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [signUpData, setSignUpData] = useState<{
    id: string;
    name: string;
    email: string;
    password: string;
    avatarUrl: string;
    isEmailVerified: boolean;
  }>({
    id: '',
    name: '',
    email: '',
    password: '',
    avatarUrl: '',
    isEmailVerified: false,
  });

  const currentStep = useMemo(() => {
    const stepParam = searchParams?.get('step');
    if (!stepParam) return 1;
    const stepNum = parseInt(stepParam, 10);
    return !isNaN(stepNum) ? stepNum : 1;
  }, [searchParams]);

  const goToStep = useCallback(
    (step: number) => {
      const query = new URLSearchParams(Array.from(searchParams?.entries() || []));
      query.set('step', String(step));
      router.push(`/sign-up?${query.toString()}`);
    },
    [router, searchParams]
  );

  const handleStepOneSuccess = (id: string, email: string) => {
    setSignUpData((prev) => ({
      ...prev,
      id,
      email,
    }));

    goToStep(2);
  };

  const handleVerifyCode = async (code: string) => {
    try {
      const { success, error } = await verifyEmailCodeAction({
        userId: signUpData.id,
        code,
      });

      if (!success && error) {
        toast.error(error);
        return;
      }
      toast.success('이메일 인증에 성공했습니다!');
      setSignUpData((prev) => ({ ...prev, isEmailVerified: true }));
      goToStep(3);
    } catch (err: unknown) {
      toast.error((err as { message: string })?.message ?? '이메일 인증 중 오류가 발생했습니다.');
    }
  };

  const handleResendEmail = async () => {
    if (!signUpData.email) return;
    try {
      const res = await resendVerificationAction({ userEmail: signUpData.email });
      if (!res.success && res.error) {
        throw new Error(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (err: unknown) {
      toast.error(
        (err as { message: string })?.message ?? '인증 메일 재전송 중 오류가 발생했습니다.'
      );
    }
  };

  const handleStepThreeSuccess = async (avatarUrl: string, name: string) => {
    setSignUpData((prev) => ({
      ...prev,
      name,
      avatarUrl,
    }));

    try {
      const { data, success, error } = await createProfileAction(
        { avatarUrl, name },
        signUpData.id
      );

      if (!success && error) {
        toast.error(error);
        return;
      }

      if (data) {
        toast.success(`${data.user.name}님, 가입이 완료되었습니다!`);
        router.push('/sign-in');
      }
    } catch (err: unknown) {
      const errMsg = (err as { message: string })?.message ?? '알 수 없는 오류가 발생했습니다.';
      toast.error(errMsg);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOneForm
            defaultValues={{
              email: signUpData.email,
              password: signUpData.password,
            }}
            onSubmitSuccess={handleStepOneSuccess}
          />
        );
      case 2:
        return (
          <StepTwoVerification
            userEmail={signUpData.email}
            onSubmitCode={handleVerifyCode}
            onResendEmail={handleResendEmail}
          />
        );
      case 3:
        return (
          <StepThreeProfile
            defaultValues={{
              name: signUpData.name,
              avatarUrl: signUpData.avatarUrl,
            }}
            onSubmitSuccess={handleStepThreeSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">아이큐(ICue) 회원가입</h1>
      <p className="text-foreground/60 mb-6 mt-1">
        병원 대기 시간을 효율적으로 관리하여 환자에게 실시간 알림과 편리한 진료 환경을 제공하는
        스마트 대기열 솔루션입니다.
      </p>

      <StepIndicator currentStep={currentStep} steps={['기본정보', '이메일 인증', '프로필 설정']} />

      <div className="relative mt-8">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentStep > 1 && (
        <button
          onClick={() => goToStep(currentStep - 1)}
          className="text-primary mt-6 inline-flex items-center text-sm hover:underline"
        >
          이전 단계로 돌아가기
        </button>
      )}

      <div className="mt-6 text-center text-sm">
        <span className="text-foreground/60">이미 계정이 있으신가요? </span>
        <button
          onClick={() => router.push('/sign-in')}
          className="text-primary inline-flex items-center hover:underline"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
