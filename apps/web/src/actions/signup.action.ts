'use server';

import { prisma } from '@icue/db/src/prisma';
import {
  profileSchema,
  type ProfileValues,
  signUpSchema,
  type SignUpValues,
} from '@icue/db/src/schemas/auth.schema';
import { saltAndHashPassword } from '@icue/db/src/utils/password';
import { generateVerificationCode } from '@icue/db/src/utils/token';
import { ApiResponse } from '@icue/shared/src/types/common.type';
import { sendVerificationRequest } from '@/lib/send-verify-email';
import { deleteUser } from './user.action';

type SignUpResponse = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    nickname: string | null;
    imageUrl: string | null;
  };
  message: string;
};

export async function signupAction(payload: SignUpValues): Promise<ApiResponse<SignUpResponse>> {
  try {
    const parsed = signUpSchema.safeParse(payload);
    if (!parsed.success) {
      const zodErrorMessage = parsed.error.errors.map((err) => err.message).join('\n');
      return {
        success: false,
        data: null,
        error: zodErrorMessage,
      };
    }

    const { email, name, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      if (existingUser.emailVerified) {
        return {
          success: false,
          data: null,
          error: '이미 해당 이메일로 가입된 사용자가 존재합니다.',
        };
      } else {
        await deleteUser(existingUser.id);
        return {
          success: false,
          data: null,
          error: '다시 시도해주세요.',
        };
      }
    }

    const passwordHash = await saltAndHashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });

    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.emailVerificationToken.create({
      data: {
        token: verificationCode,
        userId: user.id,
        expiresAt,
      },
    });

    const provider = {
      apiKey: process.env.AUTH_RESEND_KEY ?? '',
      from: 'onboarding@resend.dev',
    };

    await sendVerificationRequest({
      identifier: user.email,
      code: verificationCode,
      provider,
    });

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          nickname: user.nickname,
          imageUrl: user.image,
        },
        message: '해당 정보로 회원가입이 정상 진행되었습니다. 이메일 인증 코드를 입력해주세요.',
      },
    };
  } catch (err: unknown) {
    console.error('signupAction error:', err);
    return {
      success: false,
      data: null,
      error: '서버 에러가 발생했습니다.',
    };
  }
}

export async function createProfileAction(
  payload: ProfileValues,
  userId: string
): Promise<ApiResponse<SignUpResponse>> {
  try {
    const parsed = profileSchema.safeParse(payload);
    if (!parsed.success) {
      const zodErrorMessage = parsed.error.errors.map((err) => err.message).join('\n');
      return {
        success: false,
        data: null,
        error: zodErrorMessage,
      };
    }
    if (!userId || userId.trim().length === 0) {
      return {
        success: false,
        data: null,
        error: '유효하지 않은 유저입니다.',
      };
    }

    const { nickname, avatarUrl } = parsed.data;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return {
        success: false,
        data: null,
        error: '해당 정보로 가입된 유저를 찾을 수 없습니다.',
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        nickname,
        image: avatarUrl,
      },
    });

    return {
      success: true,
      data: {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          nickname: updatedUser.nickname,
          imageUrl: updatedUser.image,
        },
        message: '회원가입이 완료되었습니다. 이메일 인증 코드를 입력해주세요.',
      },
    };
  } catch (err: unknown) {
    console.error('createProfileAction error:', err);
    return {
      success: false,
      data: null,
      error: '서버 에러가 발생했습니다.',
    };
  }
}
