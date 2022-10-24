import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useSpotifyPlayerEmbed = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;

    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [status]);
};
