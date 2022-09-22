import { Session } from 'next-auth';

export const utilGetAccessHeaders = (session: Session | null) => {
  if (!session) return;

  const access_token = session?.access_token;

  return {
    headers: { Authorization: `Bearer ${access_token}` }
  };
};
