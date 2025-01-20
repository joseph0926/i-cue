'use client';

import { Alert, AlertDescription, AlertTitle } from '@doc-q/ui/src/components/alert';
import { Button } from '@doc-q/ui/src/components/button';
import { MailboxIcon } from 'lucide-react';

interface EmailVerificationAlertProps {
  userEmail: string;
  onResendEmail: () => void;
}

export function EmailVerificationAlert({ userEmail, onResendEmail }: EmailVerificationAlertProps) {
  return (
    <Alert variant="default" className="p-4">
      <MailboxIcon className="h-6 w-6" />
      <div className="flex flex-col gap-1">
        <AlertTitle>가입 확인 메일을 확인해주세요</AlertTitle>
        <AlertDescription>
          {userEmail} 주소로 인증 메일을 전송했습니다. 이메일 인증을 진행해주세요.
        </AlertDescription>

        <Button
          type="button"
          variant="outline"
          className="mt-2 w-fit py-2.5"
          onClick={onResendEmail}
          disabled={!userEmail}
        >
          인증 메일 다시 보내기
        </Button>
      </div>
    </Alert>
  );
}
