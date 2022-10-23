const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export async function getSpotifyToken(refresh_token: string) {
  const data = await fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  }).then((res) => res.json());

  return data;
}

export function buildSpotifyPlayer(
  token: string,
  {
    onReady,
    onStateChange
  }: {
    onReady?: (args: any) => void;
    onStateChange?: (args: any) => void;
  }
) {
  const player = new window.Spotify.Player({
    name: 'Spotify Web Player',
    volume: 0.4,
    getOAuthToken: (cb: (token: string) => void) => {
      cb(token);
    }
  });

  player.addListener('ready', ({ device_id }: { device_id: string }) => {
    if (typeof onReady === 'function') onReady(device_id);
  });

  player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
    console.log('Device ID has gone offline', device_id);
  });

  player.addListener('playback_error', ({ message }: { message: string }) => {
    console.error(message);
  });

  player.addListener(
    'initialization_error',
    ({ message }: { message: string }) => {
      console.error(message);
    }
  );

  player.addListener(
    'authentication_error',
    ({ message }: { message: string }) => {
      console.error(message);
    }
  );

  player.addListener('account_error', ({ message }: { message: string }) => {
    console.error(message);
  });

  player.addListener('player_state_changed', (state: any) => {
    if (!state) return;

    if (typeof onStateChange === 'function') onStateChange(state);
  });

  return player;
}
