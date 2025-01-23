import { signOut } from '@/auth';

export default function HomePage() {
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button>로그아웃</button>
      </form>
    </div>
  );
}
