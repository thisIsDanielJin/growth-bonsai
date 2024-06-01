import NextAuth, { AuthOptions } from "next-auth";
import GoogleProfile from "next-auth/providers/google";
//import CredentialsProvider from "next-auth/providers/credentials";
//import bcrypt from "bcrypt";
import clientPromise from "@/utils/connectMongodb";

interface User {
  id: string;
  name: string;
  email: string;
}

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  providers: [
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile) {
        const client = await clientPromise;
        const users = client.db("Application").collection("users");

        let user = await users.findOne({ user_email: profile.email });

        if (!user) {
          const now = new Date();
          const newUser = {
            user_name: profile.name,
            user_email: profile.email,
            created_at: now,
            updated_at: now,
          };
          const result = await users.insertOne(newUser);
          user = {
            _id: result.insertedId,
            ...newUser,
          };
        }
        return {
          id: user._id.toString(),
          name: user.user_name,
          email: user.user_email,
        } as User;
      },
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     if (!credentials) return null;
    //     const { email, password } = credentials;

    //     const client = await clientPromise;
    //     const users = client.db("Application").collection("users");
    //     const user = await users.findOne({
    //       user_email: email,
    //       user_password: password,
    //     });

    //     if (user && (await bcrypt.compare(password, user.user_password))) {
    //       return {
    //         id: user._id.toString(),
    //         name: user.user_name,
    //         email: user.user_email,
    //       } as User;
    //     }
    //     return null;
    //   },
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl + "/app";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
