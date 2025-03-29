import NextAuth, { DefaultSession, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

interface CustomUser extends User {
  id: string;
  name: string;
  email: string;
}

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
            return {
              id: credentials.userId,
              name: credentials.userId,
              email: `${credentials.userId}@example.com`,
            } as CustomUser;
          }
          
          throw new Error("Giriş başarısız");
        } catch (error) {
          console.error("Giriş hatası:", error);
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Giriş işlemi başarısız");
          }
          throw new Error("Giriş işlemi başarısız");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
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
