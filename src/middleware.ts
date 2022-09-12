export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/albums/:album*',
    '/artists/:artist*',
    '/playlists/:playlist*',
    '/users/me',
    '/users/:user*'
  ]
};
