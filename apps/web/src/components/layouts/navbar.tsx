import { LogoTextIcon } from '@icue/ui/src/components/icons';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { NavbarAuth } from './navbar-auth';
import { NavbarMenu } from './navbar-menu';

export const Navbar = () => {
  return (
    <nav className="hidden w-full items-center justify-between p-2.5 px-10 md:flex">
      <Link href={ROUTES.LANDING} className="relative h-[4.75rem] w-40">
        <LogoTextIcon className="size-full" />
      </Link>
      <NavbarMenu />
      <NavbarAuth />
    </nav>
  );
};
