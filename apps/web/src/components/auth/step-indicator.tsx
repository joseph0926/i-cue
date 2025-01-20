'use client';

import { cn } from '@doc-q/ui/src/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={label} className="flex flex-col items-center text-xs">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full font-bold',
                isActive
                  ? 'bg-primary text-white'
                  : isCompleted
                    ? 'bg-primary/70 text-white'
                    : 'bg-gray-200 text-gray-500'
              )}
            >
              {stepNumber}
            </div>
            <div className="mt-1 whitespace-nowrap">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
