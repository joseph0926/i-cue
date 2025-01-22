import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/;

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, '이메일은 5자 이상이어야 합니다.')
    .max(100, '이메일은 최대 100자까지 가능합니다.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(100, '비밀번호는 최대 100자까지 가능합니다.')
    .regex(
      passwordRegex,
      '비밀번호는 대문자, 숫자, 특수문자를 각각 최소 1개 이상 포함해야 합니다.'
    ),
});

export const verifyCodeSchema = z.object({
  code: z.string().regex(/^\d+$/, '숫자만 입력해주세요.').length(6, '6자리 숫자여야 합니다.'),
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, '닉네임은 필수입니다.')
    .max(20, '닉네임은 최대 20자까지 가능합니다.')
    .regex(
      /^[가-힣a-zA-Z0-9\-_]+$/,
      '한글, 영어, 숫자, 하이픈(-), 언더바(_)만 사용할 수 있습니다.'
    ),
  avatarUrl: z.string().optional(),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, '이메일은 5자 이상이어야 합니다.')
    .max(100, '이메일은 최대 100자까지 가능합니다.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(100, '비밀번호는 최대 100자까지 가능합니다.')
    .regex(
      passwordRegex,
      '비밀번호는 대문자, 숫자, 특수문자를 각각 최소 1개 이상 포함해야 합니다.'
    ),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
