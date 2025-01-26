import { ThemeToggle } from '@icue/ui/src/components/theme-toggle';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';
import { ROUTES } from '@/constants/routes';
import { NavbarAuthAvatar } from './navbar-auth-avatar';

export const NavbarAuth = async () => {
  const session = await auth();

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      {session ? (
        <NavbarAuthAvatar session={session} />
      ) : (
        <Link href={ROUTES.SIGNIN} className="relative">
          <LogIn className="size-4" />
        </Link>
      )}
    </div>
  );
};
