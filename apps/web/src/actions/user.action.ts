'use server';

import { prisma } from '@icue/db/src/prisma';
import { ApiResponse } from '@icue/shared/src/types/common.type';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
  try {
    if (!userId || userId.trim().length === 0) {
      return {
        data: null,
        error: '유효하지 않은 유저입니다.',
        success: false,
      };
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return {
      data: {
        message: '유저가 삭제되었습니다.',
      },
      success: true,
    };
  } catch (err) {
    console.error('deleteUser error:', err);
    return {
      success: false,
      data: null,
      error: '서버 에러가 발생했습니다.',
    };
  }
}

export async function getUserByEmail(email: string, plainPassword: string): Promise<User | null> {
  if (email.trim().length === 0 || plainPassword.trim().length === 0) {
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return null;
    }

    const isMatch = await bcrypt.compare(plainPassword, user.passwordHash);
    if (!isMatch) {
      return null;
    }

    return user;
  } catch (err) {
    console.error('getUserByEmail error:', err);
    return null;
  }
}
