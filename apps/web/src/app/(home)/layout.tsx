import { BG } from '@icue/ui/src/components/bg';
import { Navbar } from '@/components/layouts/navbar';
import { NavbarMobile } from '@/components/layouts/navbar-mobile';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BG />
      <Navbar />
      <NavbarMobile />
      {children}
    </div>
  );
}
