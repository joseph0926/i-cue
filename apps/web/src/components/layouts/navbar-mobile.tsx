'use client';

import { LogoIcon } from '@icue/ui/src/components/icons';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { NavbarMobileSheet } from './navbar-mobile-sheet';

export const NavbarMobile = () => {
  return (
    <nav className="flex w-full items-center justify-between px-6 py-4 md:hidden">
      <Link href={ROUTES.HOME} className="relative size-10">
        <LogoIcon className="size-full" />
      </Link>
      <NavbarMobileSheet />
    </nav>
  );
};
