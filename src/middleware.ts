export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/artists/top', '/artists/:artist']
};
