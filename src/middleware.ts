export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/library',
    '/albums/:album*',
    '/artists/:artist*',
    '/browse/featured-playlists',
    '/playlists/:playlist*',
    '/users/me',
    '/users/:user*'
  ]
};
