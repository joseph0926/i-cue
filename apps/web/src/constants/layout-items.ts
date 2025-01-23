import { Book, Boxes, Eye, LucideIcon, Tv } from 'lucide-react';

type NavbarItemType = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

export const navbarItems: NavbarItemType[] = [
  { label: '아이디어', href: '/idea', Icon: Eye },
  { label: '스트리머', href: '/streamer', Icon: Tv },
  { label: '이벤트', href: '/event', Icon: Boxes },
  { label: '가이드', href: '/docs', Icon: Book },
];
