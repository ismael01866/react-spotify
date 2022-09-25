import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useUserIsMe = (userID?: string) => {
  const { data: session, status }: any = useSession();
  const [userIsMe, setUserIsMe] = useState<boolean>();

  useEffect(() => {
    if (status !== 'authenticated') return;

    setUserIsMe(session?.user?.id === userID);
  }, [status, session, userID]);

  return { userIsMe };
};
