import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';

// const scope = 'user-read-recently-played';

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId,
      clientSecret
      // authorization: {
      //   params: { scope }
      // }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin'
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.refresh_token = account.refresh_token;
      }

      return token;
    }
  }
});
