import axios from "axios";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      type: "credentials",

      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const response = await axios.post(
            "https://apiexpense.vercel.app/api/auth/login",
            {
              email,
              password,
            }
          );
          const userData = response.data;

          // console.log('API Response:', userData)
          // window?.localStorage.setItem('auth-token', userData.token)
          if (!userData || !userData.token) {
            throw new Error("Token not found in API response");
          }

          return {
            id: userData.token,
            name: `${userData.userName}`,
            email: userData.email,
            phone: userData.phone,
            userId: userData.UserId,
            expireAt: userData.expiresAt,

            // Add other necessary user information here
            // Note: Do not include the token here, as it is already handled by NextAuth.js
          };
        } catch (error) {
          console.error("Authorization Error:", error.message);
          throw new Error("Failed to authorize user");
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 days
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // console.log('JWT Callback - Token:', token)
      // console.log('JWT Callback - User:', user)

      if (user) {
        (token.name = user.name),
          (token.id = user.id),
          (token.userId = user.userId),
          // (token.user_role = user.user_role),
          (token.expireAt = user.expireAt);
      }

      return token;
    },
    async session({ session, token }) {
      // console.log('Session Callback - Token:', token)
      // console.log('Session Callback - Session:', session)
      // console.log(token)

      if (token) {
        session.user = {
          token: token.id,
          name: token.name,
          email: token.email,
          userId: token.userId,
          user_role: token.user_role,
          expireAt: token.expireAt,

          // Add other necessary user information here
        };
      }

      return session;
    },
  },
};
