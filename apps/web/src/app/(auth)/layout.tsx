import { BG } from '@doc-q/ui/src/components/bg';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BG />
      <div className="to-bg from-primary absolute z-0 h-[500px] w-screen rounded-full bg-gradient-to-r opacity-20 blur-[150px]" />
      <div className="text-foreground flex min-h-screen items-center justify-center">
        <div className="bg-card/30 text-card-foreground z-10 w-full max-w-md rounded-md p-6 shadow-md">
          {children}
        </div>
      </div>
    </>
  );
}
