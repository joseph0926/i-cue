import { Button } from '@icue/ui/src/components/button';
import { ArrowUpRight, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex max-w-full items-center justify-center overflow-x-hidden"
    >
      <div className="container relative z-20 py-12 text-center lg:pb-16">
        <h1 id="hero-heading" className="sr-only">
          ICue - 방송 아이디어 매칭 플랫폼
        </h1>

        <div className="mb-4 flex justify-center">
          <div
            className="border-primary/30 bg-card mx-auto flex flex-wrap items-center justify-center rounded-full border p-px px-3 py-1 text-xs shadow-sm sm:px-4 sm:text-sm"
            aria-label="아이디어 제안 플랫폼 소개"
          >
            <span className="text-primary flex items-center gap-2 font-semibold">
              <Lightbulb aria-hidden="true" className="size-4 sm:size-5" />
              아이디어 제안 플랫폼
            </span>
            <span className="text-foreground/60 ml-1 block font-medium">
              시청자와 스트리머를 연결
            </span>
          </div>
        </div>

        <h2
          className="mx-auto max-w-4xl text-balance text-3xl font-bold sm:text-4xl lg:text-7xl"
          aria-label="새로운 방송 콘텐츠, 시청자가 직접 기획, 스트리머가 채택하는 세상!"
        >
          새로운 방송 콘텐츠,
          <br className="block sm:hidden" />
          <span className="text-primary"> 시청자가 직접 기획 </span>
          <br className="block" />
          스트리머가 채택하는 세상!
        </h2>

        <p className="text-foreground/60 mx-auto mt-4 max-w-2xl text-balance text-base sm:text-lg">
          게임, 토크, 이벤트, 코스프레 등
          <br className="hidden sm:block" />
          창의적인 아이디어를 제안하고 채택되면 보상까지!
          <br />
          이제 당신의 아이디어가 방송을 바꿉니다.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
          <Button
            size="lg"
            variant="default"
            asChild
            className="w-1/2 md:w-1/4"
            aria-label="아이디어 둘러보기 페이지로 이동"
          >
            <Link href={ROUTES.IDEA}>
              아이디어 둘러보기
              <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-1/2 md:w-1/4"
            aria-label="스트리머 등록 페이지로 이동"
          >
            <Link href={ROUTES.STREAMER}>
              <Users className="mr-2 size-4" aria-hidden="true" />
              스트리머 등록
            </Link>
          </Button>
        </div>

        <div className="text-foreground/50 mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-6">
          <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 sm:px-4 sm:py-2">
            <Image
              src="/icons/game.svg"
              width={16}
              height={16}
              alt="게임"
              className="size-4 sm:size-5 dark:invert-0"
            />
            <span className="text-sm font-semibold sm:text-base">게임 기획</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 sm:px-4 sm:py-2">
            <Image
              src="/icons/event.svg"
              alt="이벤트"
              width={16}
              height={16}
              className="size-4 sm:size-5 dark:invert-0"
            />
            <span className="text-sm font-semibold sm:text-base">이벤트/챌린지</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 sm:px-4 sm:py-2">
            <Image
              src="/icons/talk.svg"
              alt="토크"
              width={16}
              height={16}
              className="size-4 sm:size-5 dark:invert-0"
            />
            <span className="text-sm font-semibold sm:text-base">토크 코너</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 sm:px-4 sm:py-2">
            <Image
              src="/icons/cosplay.svg"
              alt="코스프레"
              width={16}
              height={16}
              className="size-4 sm:size-5 dark:invert-0"
            />
            <span className="text-sm font-semibold sm:text-base">코스프레</span>
          </div>
        </div>

        <div className="bg-card/50 dark:shadow-foreground/10 mx-10 mt-12 grid max-w-5xl grid-cols-1 gap-4 rounded-2xl border p-4 shadow-lg sm:mt-16 sm:p-6 md:mx-auto md:grid-cols-3">
          <div className="py-3 text-center" aria-label="누적 아이디어 제안: 500+">
            <div className="text-primary text-2xl font-bold sm:text-4xl" aria-hidden="true">
              500+
            </div>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">누적 아이디어 제안</p>
            <p className="text-muted-foreground text-[10px] sm:text-xs">
              크리에이티브가 넘치는 공간
            </p>
          </div>
          <div className="py-3 text-center" aria-label="실제 채택 사례: 300+">
            <div className="text-primary text-2xl font-bold sm:text-4xl" aria-hidden="true">
              300+
            </div>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">실제 채택 사례</p>
            <p className="text-muted-foreground text-[10px] sm:text-xs">방송 콘텐츠로 구현</p>
          </div>
          <div className="py-3 text-center" aria-label="협업 스트리머: 50명+">
            <div className="text-primary text-2xl font-bold sm:text-4xl" aria-hidden="true">
              50명+
            </div>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">협업 스트리머</p>
            <p className="text-muted-foreground text-[10px] sm:text-xs">다양한 장르 채널 운영</p>
          </div>
        </div>
      </div>
    </section>
  );
}
