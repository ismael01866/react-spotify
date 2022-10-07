import { kebabCase } from 'lodash';
import { useRouter } from 'next/router';

export const useCurrentRoute = (href: string, label: string) => {
  const router = useRouter();

  let isCurrentRoute = false;
  const isHome = router.pathname === '/';

  if (isHome) {
    isCurrentRoute = router.pathname === href;
  }

  if (!isHome) {
    isCurrentRoute = router.pathname.startsWith(`/${kebabCase(label)}`);
  }

  return isCurrentRoute;
};
