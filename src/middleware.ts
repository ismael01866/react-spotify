export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/albums/:album*',
    '/artists/:artist*',
    '/browse/featured-playlists',
    '/collection/tracks',
    '/library',
    '/playlists/:playlist*',
    '/users/:user*',
    '/users/me'
  ]
};
