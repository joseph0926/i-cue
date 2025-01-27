'use client';

import { cn } from '@icue/ui/src/lib/utils';
import { useState } from 'react';
import { featureTabs } from '@/constants/landing-items';

export function ExperienceSection() {
  const [selectedTab, setSelectedTab] = useState(featureTabs[0].id);

  return (
    <section
      id="experience"
      className="flex scroll-my-20 flex-col items-center justify-center py-12 lg:py-16"
      aria-labelledby="features-heading"
    >
      <h2 id="features-heading" className="sr-only">
        서비스 주요 기능
      </h2>

      <div className="container max-w-5xl">
        <div className="mx-auto mb-6 flex flex-col items-center justify-center lg:mb-0 lg:max-w-5xl lg:text-center">
          <h3 className="text-4xl font-bold lg:text-5xl">서비스 주요 기능</h3>
          <p className="text-muted-foreground mt-6 text-balance text-center text-lg">
            시청자 제안부터 투표, 채택, 보상까지
            <br />
            한눈에 확인하는 ICue 프로세스
          </p>
        </div>

        <nav
          className="mb-4 mt-8 flex justify-center"
          role="tablist"
          aria-label="ICue 기능 탭 목록"
        >
          {featureTabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setSelectedTab(tab.id)}
                className={cn(
                  'flex w-40 flex-col items-center gap-2 rounded-lg px-4 py-3 transition-colors',
                  isActive
                    ? 'bg-primary/5 text-primary dark:bg-primary/10 font-bold'
                    : 'text-foreground/80 hover:bg-primary/5 font-medium'
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={cn(
                    'size-6 md:size-8',
                    isActive ? 'text-primary' : 'text-foreground opacity-30'
                  )}
                />
                <span className="text-sm md:text-base">{tab.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <div className="container flex max-w-5xl items-center justify-center">
          {featureTabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <div
                key={tab.id}
                role="tabpanel"
                id={`panel-${tab.id}`}
                aria-labelledby={tab.id}
                className={cn(
                  'w-full border-t py-8 first:border-t-0 md:py-12 lg:border-t-0 lg:py-16',
                  isActive ? 'block' : 'hidden lg:hidden'
                )}
              >
                <div className="flex w-full items-center justify-center gap-8 lg:gap-12">
                  <div>
                    <h4 className="text-foreground/80 text-center text-2xl font-normal leading-normal md:text-3xl">
                      <strong className="text-primary">{tab.title}</strong>
                      <span className="mt-2 block text-xl">{tab.subtitle}</span>
                    </h4>
                    <p className="text-muted-foreground mt-4">{tab.description}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tab.highlights.map((highlight, k) => (
                    <div
                      key={`highlight-${k}`}
                      className="bg-card hover:border-primary flex flex-col justify-between gap-2.5 rounded-lg border p-6 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <highlight.icon className="text-primary h-6 w-6" aria-hidden="true" />
                        <strong className="block text-lg">{highlight.title}</strong>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
