'use server';

import { prisma } from '@icue/db/src/prisma';
import { generateVerificationCode } from '@icue/db/src/utils/token';
import { ApiResponse } from '@icue/shared/src/types/common.type';
import { sendVerificationRequest } from '@/lib/send-verify-email';

export type ResendVerificationPayload = {
  userEmail: string;
};

type ResendVerificationResponse = {
  message: string;
};

type VerifyEmailCodePayload = {
  userId: string;
  code: string;
};

type VerifyEmailCodeResponse = {
  message: string;
};

export async function resendVerificationAction(
  payload: ResendVerificationPayload
): Promise<ApiResponse<ResendVerificationResponse>> {
  try {
    const { userEmail } = payload;

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      return {
        success: false,
        data: null,
        error: '해당 이메일의 유저가 없습니다.',
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        data: null,
        error: '이미 이메일이 인증된 사용자입니다.',
      };
    }

    const verificationCode = generateVerificationCode();
    const expires = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.verificationToken.deleteMany({
      where: { identifier: user.id },
    });
    await prisma.verificationToken.create({
      data: {
        token: verificationCode,
        identifier: user.id,
        expires,
      },
    });

    const provider = {
      apiKey: process.env.AUTH_RESEND_KEY ?? '',
      from: process.env.EMAIL_FROM ?? '',
    };

    await sendVerificationRequest({
      identifier: user.email!,
      code: verificationCode,
      provider,
    });

    return {
      success: true,
      data: { message: '인증 코드가 재전송되었습니다. 이메일을 확인해주세요.' },
    };
  } catch (error: unknown) {
    console.error('resendVerificationAction error:', error);
    return {
      success: false,
      data: null,
      error: '인증 코드 재전송 중 오류가 발생했습니다.',
    };
  }
}

export async function verifyEmailCodeAction(
  payload: VerifyEmailCodePayload
): Promise<ApiResponse<VerifyEmailCodeResponse>> {
  try {
    const { userId, code } = payload;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        success: false,
        data: null,
        error: '존재하지 않는 사용자입니다.',
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        data: null,
        error: '이미 이메일이 인증된 사용자입니다.',
      };
    }

    const verificationRecord = await prisma.verificationToken.findFirst({
      where: {
        identifier: user.id,
        token: code,
      },
    });

    if (!verificationRecord) {
      return {
        success: false,
        data: null,
        error: '유효하지 않은 코드입니다.',
      };
    }

    if (verificationRecord.expires < new Date()) {
      return {
        success: false,
        data: null,
        error: '인증 코드가 만료되었습니다. 다시 시도해주세요.',
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.deleteMany({ where: { identifier: user.id } });

    return {
      success: true,
      data: {
        message: '이메일 인증이 완료되었습니다.',
      },
    };
  } catch (error: unknown) {
    console.error('verifyEmailCodeAction error:', error);
    return {
      success: false,
      data: null,
      error: '이메일 인증 중 오류가 발생했습니다.',
    };
  }
}
