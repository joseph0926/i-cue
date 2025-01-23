import { LogoTextIcon } from '@icue/ui/src/components/icons';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-2.5 px-4">
      <Link href={ROUTES.HOME} className="relative h-20 w-40">
        <LogoTextIcon className="size-full" />
      </Link>
    </nav>
  );
};
