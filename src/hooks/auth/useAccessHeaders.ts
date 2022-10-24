import { useSession } from 'next-auth/react';

import { utilGetAccessHeaders } from 'utils/helpers';

export const useAccessHeaders = () => {
  const { data: session } = useSession();

  return utilGetAccessHeaders(session);
};
