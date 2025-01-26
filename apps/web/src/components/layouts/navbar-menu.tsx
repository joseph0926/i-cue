'use client';

import { cn } from '@icue/ui/src/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { navbarItems } from '@/constants/layout-items';

type IndicatorStyle = {
  left: number;
  top: number;
  visible: boolean;
};

export const NavbarMenu = () => {
  const pathname = usePathname();

  const navContainerRef = useRef<HTMLUListElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    top: 0,
    visible: false,
  });
  const [hoveredItemHref, setHoveredItemHref] = useState<string | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>, href: string) => {
    if (!navContainerRef.current) return;

    const li = e.currentTarget;

    const liRect = li.getBoundingClientRect();

    const navRect = navContainerRef.current.getBoundingClientRect();

    const liCenterX = liRect.left + liRect.width / 2;
    const liCenterY = liRect.top + liRect.height / 2;

    const left = liCenterX - navRect.left;
    const top = liCenterY - navRect.top;

    setHoveredItemHref(href);
    setIndicatorStyle({
      left,
      top,
      visible: true,
    });
  };

  const handleMouseLeaveNav = () => {
    setHoveredItemHref(null);
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
      {navbarItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const isHovered = hoveredItemHref === item.href;

        return (
          <li onMouseEnter={(e) => handleMouseEnter(e, item.href)} key={item.href} className="z-10">
            <Link
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative flex items-center gap-3 transition-colors',
                isActive || isHovered ? 'text-primary' : 'text-foreground'
              )}
            >
              <span className="text-sm font-semibold">{item.label}</span>
              <item.Icon className="size-4" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
