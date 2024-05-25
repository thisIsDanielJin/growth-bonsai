import Nextauth from "next-auth";
import GoogleProfile from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import clientPromise from "@/utils/connectMongodb";
import { AdapterUser } from "next-auth/adapters";
import { Profile } from "next-auth";
import { Account } from "next-auth";

interface User {
  id: string;
  name: string;
  email: string;
}

export const authOptions = {
  providers: [
    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const { email, password } = credentials;

        const client = await clientPromise;
        const users = client.db("Application").collection("users");
        const user = await users.findOne({
          user_email: email,
          user_password: password,
        });

        if (user && (await bcrypt.compare(password, user.user_password))) {
          return {
            id: user._id.toString(),
            name: user.user_name,
            email: user.user_email,
          } as User;
        }
        return null;
      },
    }),
  ],
};

export const handler = Nextauth(authOptions);

export { handler as GET, handler as POST };
