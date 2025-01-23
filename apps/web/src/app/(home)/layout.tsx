import { BG } from '@icue/ui/src/components/bg';
import { Navbar } from '@/components/layouts/navbar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BG />
      <Navbar />
      {children}
    </div>
  );
}
