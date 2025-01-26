'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@icue/ui/src/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@icue/ui/src/components/dropdown-menu';
import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { navbarAuthItems } from '@/constants/layout-items';

type NavbarAuthAvatarProps = {
  session: Session;
};

export const NavbarAuthAvatar = ({ session }: NavbarAuthAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8">
          <AvatarImage src={session.user.image ?? undefined} alt={`${session.user.name} 아바타`} />
          <AvatarFallback className="text-sm font-semibold">
            {session.user.name?.slice(0, 1)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navbarAuthItems.map((item) => (
          <DropdownMenuItem asChild key={item.href} className="cursor-pointer">
            <Link
              onClick={() => {
                if (item.label === '로그아웃') {
                  signOut();
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
  );
};
