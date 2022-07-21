const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
  'base64'
);

export const getSpotifyToken = async function (refresh_token: string) {
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
};
