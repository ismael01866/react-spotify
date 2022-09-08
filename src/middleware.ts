export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/albums/:album*', '/artists/:artist*', '/users/:me*']
};
