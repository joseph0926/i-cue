import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@icue/db/src/prisma';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
import Twitter from 'next-auth/providers/twitter';
import { getUserByEmail } from './actions/user.action';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  debug: false,
  logger: {
    error(code) {
      if (
        code.message.includes('Read more at https://errors.authjs.dev#adaptererror') ||
        code.message.includes('Read more at https://errors.authjs.dev#sessiontokenerror') ||
        JSON.stringify(code?.cause ?? '').includes('PrismaClient is not configured')
      ) {
        return;
      }
      console.error(code.message);
    },
  },
  providers: [
    Google,
    Naver,
    Kakao,
    Twitter,
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력하세요.');
        }

        if (
          !credentials?.email ||
          typeof credentials.email !== 'string' ||
          !credentials?.password ||
          typeof credentials.password !== 'string'
        ) {
          throw new Error('이메일 또는 비밀번호가 유효하지 않습니다.');
        }

        const user = await getUserByEmail(credentials.email, credentials.password);
        if (!user) {
          throw new Error('Invalid credentials.');
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});
