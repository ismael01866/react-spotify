import NextAuth, { Account, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
import { getSpotifyToken } from 'src/lib/spotify';

const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';

const scope =
  'streaming user-read-email user-read-private user-read-recently-played user-top-read user-read-playback-state user-modify-playback-state';

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId,
      clientSecret,
      authorization: {
        params: { scope }
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin'
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        return {
          expires_at: account.expires_at,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          user
        };
      }

      const tokenHasExpired = Date.now() > (token.expires_at as Number);
      if (!tokenHasExpired) return token;

      // refresh token

      const refreshToken = token.refresh_token as string;
      const { access_token } = await getSpotifyToken(refreshToken);

      token.access_token = access_token;

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as User;
      session.access_token = token.access_token;

      return session;
    }
  }
});
