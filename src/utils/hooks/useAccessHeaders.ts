import { useSession } from 'next-auth/react';
import { utilGetAccessHeaders } from '../helpers';

export const useAccessHeaders = () => {
  const { data: session } = useSession();
  return utilGetAccessHeaders(session);
};
