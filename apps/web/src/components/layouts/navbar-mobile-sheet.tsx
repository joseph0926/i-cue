'use client';

import { LogoTextIcon } from '@icue/ui/src/components/icons';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@icue/ui/src/components/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';

export const NavbarMobileSheet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="size-7" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle onClick={() => setOpen(false)}>
            <Link href={ROUTES.HOME} className="relative w-full">
              <LogoTextIcon className="h-14" />
            </Link>
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
