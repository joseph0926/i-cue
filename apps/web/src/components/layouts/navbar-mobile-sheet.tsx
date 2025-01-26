'use client';

import { LogoTextIcon } from '@icue/ui/src/components/icons';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@icue/ui/src/components/sheet';
import { ThemeToggle } from '@icue/ui/src/components/theme-toggle';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { navbarItems } from '@/constants/layout-items';
import { ROUTES } from '@/constants/routes';
import { NavbarAuthAvatar } from './navbar-auth-avatar';

export const NavbarMobileSheet = () => {
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu aria-label="메뉴 열기" className="size-7" />
      </SheetTrigger>
      <SheetContent className="flex flex-col px-6 py-4">
        <SheetHeader className="mb-4 flex items-center justify-between">
          <div>
            <SheetTitle className="flex items-center gap-2">
              <Link href={ROUTES.LANDING} onClick={() => setOpen(false)}>
                <LogoTextIcon className="h-10" />
              </Link>
            </SheetTitle>
          </div>
        </SheetHeader>
        <nav className="flex-1 overflow-auto">
          <ul className="flex flex-col gap-4">
            {navbarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded px-2 py-2 text-base font-semibold"
                >
                  <item.Icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session ? <NavbarAuthAvatar session={session} /> : <Link href="/sign-in">로그인</Link>}
          </div>
          <span className="text-muted-foreground text-sm">© 2025 아이큐 (I-CUE)</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};
