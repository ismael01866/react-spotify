import { HiHome, HiSearchCircle, HiViewBoards } from 'react-icons/hi';
import { RiHeartsFill } from 'react-icons/ri';

export const data = [
  {
    href: '/',
    label: 'home',
    icon: HiHome
  },
  {
    href: '/search',
    label: 'search',
    icon: HiSearchCircle
  },
  {
    href: '/library',
    label: 'library',
    icon: HiViewBoards
  },
  {
    href: '/liked/songs',
    label: 'liked songs',
    icon: RiHeartsFill
  }
];
