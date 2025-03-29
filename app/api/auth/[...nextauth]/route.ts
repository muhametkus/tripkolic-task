import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "userId", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) {
          throw new Error("Kullanıcı adı ve şifre gereklidir");
        }

        try {
          const response = await axios.post("https://api.tripkolic.com/api/v1/task/login", {
            userId: credentials.userId,
            password: credentials.password,
          });

          const { status } = response.data;

          if (status == true) {
            // API başarılı yanıt verdiğinde kullanıcı nesnesini döndür
            return {
              id: credentials.userId,
              name: credentials.userId,
              email: `${credentials.userId}@example.com`, // NextAuth email field gerektirir
            };
          }
          
          throw new Error("Giriş başarısız");
        } catch (error: any) {
          console.error("Giriş hatası:", error);
          throw new Error(error.response?.data?.message || "Giriş işlemi başarısız");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "0b7b17682e20221b72e8ec6b874ce0d54769c8fd4e9f8f94b7be5bbfc3a145fb",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
