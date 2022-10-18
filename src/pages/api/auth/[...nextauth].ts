import moment from 'moment';
import NextAuth, { User } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { getSpotifyToken } from 'src/utils/spotify';

const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';

const scope = `streaming 
               playlist-read-private
               playlist-read-collaborative
               playlist-modify-public
               playlist-modify-private
               user-library-read 
               user-library-modify 
               user-modify-playback-state 
               user-top-read 
               user-read-email 
               user-read-private 
               user-read-recently-played 
               user-read-currently-playing 
               user-read-playback-state 
               user-follow-read
               user-follow-modify`;

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId,
      clientSecret,
      authorization: {
        params: { scope, show_dialog: true }
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin'
  },

  // debug: true,

  // logger: {
  //   error(code, metadata) {
  //     console.error(code, metadata);
  //   },
  //   warn(code) {
  //     console.warn(code);
  //   },
  //   debug(code, metadata) {
  //     console.debug(code, metadata);
  //   }
  // },

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

      const tokenHasExpired =
        moment(Date.now()).unix() > (token.expires_at as Number);

      if (!tokenHasExpired) return token;

      // refresh token

      const { access_token, expires_in } = await getSpotifyToken(
        token.refresh_token as string
      );

      token.expires_at = moment(Date.now())
        .add(expires_in / 60, 'minutes')
        .unix();

      token.access_token = access_token;

      return token;
    },

    async session({ session, token }) {
      // session.debug = token;

      session.user = token.user as User;
      session.access_token = token.access_token;

      return session;
    }
  }
});
