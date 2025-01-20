import { BG } from '@doc-q/ui/src/components/bg';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BG />
      {children}
    </div>
  );
}
