'use client';

import { cn } from '@icue/ui/src/lib/utils';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { navbarItems } from '@/constants/layout-items';

type IndicatorStyle = {
  left: number;
  top: number;
  visible: boolean;
};

export const NavbarMenu = () => {
  const navContainerRef = useRef<HTMLUListElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    top: 0,
    visible: false,
  });
  const [activeItemHref, setActiveItemHref] = useState<string | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>, href: string) => {
    if (!navContainerRef.current) return;

    const li = e.currentTarget;

    const liRect = li.getBoundingClientRect();

    const navRect = navContainerRef.current.getBoundingClientRect();

    const liCenterX = liRect.left + liRect.width / 2;
    const liCenterY = liRect.top + liRect.height / 2;

    const left = liCenterX - navRect.left;
    const top = liCenterY - navRect.top;

    setActiveItemHref(href);
    setIndicatorStyle({
      left,
      top,
      visible: true,
    });
  };

  const handleMouseLeaveNav = () => {
    setActiveItemHref(null);
    setIndicatorStyle((prev) => ({
      ...prev,
      visible: false,
    }));
  };
  return (
    <ul
      onMouseLeave={handleMouseLeaveNav}
      ref={navContainerRef}
      className="relative flex items-center gap-6"
    >
      <div
        className={cn(
          'bg-primary/20 pointer-events-none absolute z-0 h-10 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out will-change-transform',
          indicatorStyle.visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
        style={{
          left: indicatorStyle.left,
          top: indicatorStyle.top,
        }}
      />
      {navbarItems.map((item) => (
        <li onMouseEnter={(e) => handleMouseEnter(e, item.href)} key={item.href} className="z-10">
          <Link
            href={'#'}
            className={cn(
              'relative flex items-center gap-3',
              activeItemHref === item.href ? 'text-primary' : 'text-foreground'
            )}
          >
            <span className="text-sm font-semibold">{item.label}</span>
            <item.Icon className="size-5" />
          </Link>
        </li>
      ))}
    </ul>
  );
};
