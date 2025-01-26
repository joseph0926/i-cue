import { Avatar, AvatarFallback, AvatarImage } from '@icue/ui/src/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@icue/ui/src/components/dropdown-menu';
import { ThemeToggle } from '@icue/ui/src/components/theme-toggle';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { navbarAuthItems } from '@/constants/layout-items';
import { ROUTES } from '@/constants/routes';

export const NavbarAuth = async () => {
  const session = await auth();

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-8">
              <AvatarImage
                src={session.user.image ?? undefined}
                alt={`${session.user.name} 아바타`}
              />
              <AvatarFallback className="text-sm font-semibold">
                {session.user.name?.slice(0, 1)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navbarAuthItems.map((item) => (
              <DropdownMenuItem asChild key={item.href} className="cursor-pointer">
                <Link
                  onClick={async () => {
                    'use server';
                    if (item.label === '로그아웃') {
                      await signOut();
                    }
                  }}
                  href={item.href}
                  className="flex w-full items-center justify-between px-2.5"
                >
                  <span>{item.label}</span>
                  <item.Icon />
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={ROUTES.SIGNIN} className="relative">
          <LogIn className="size-4" />
        </Link>
      )}
    </div>
  );
};
