import { Book, Boxes, Eye, LogOut, LucideIcon, Tv, User2 } from 'lucide-react';
import { ROUTES } from './routes';

type NavbarItemType = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

export const navbarItems: NavbarItemType[] = [
  { label: '아이디어', href: ROUTES.IDEA, Icon: Eye },
  { label: '스트리머', href: ROUTES.STREAMER, Icon: Tv },
  { label: '이벤트', href: ROUTES.EVENT, Icon: Boxes },
  { label: '가이드', href: ROUTES.DOCS, Icon: Book },
];

export const navbarAuthItems: NavbarItemType[] = [
  { label: '프로필', href: ROUTES.MY, Icon: User2 },
  { label: '로그아웃', href: ROUTES.HOME, Icon: LogOut },
];
