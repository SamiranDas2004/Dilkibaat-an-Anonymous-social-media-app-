// In your NextAuth configuration file
import dbConnect from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import UserModel from "@/models/user";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";
import axios from 'axios';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            email: credentials.identifier.email
          });

          if (!user) {
            throw new Error('No user found');
          }

          const passwordCorrect = await bcrypt.compare(credentials.password, credentials.password);

          if (passwordCorrect) {
            return user;
          } else {
            throw new Error('No user found');
          }
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === 'github') {
        await dbConnect();

        try {
          const existingUser = await UserModel.findOne({ email: user.email });

          if (!existingUser) {
            // Call your signup API to create a new user
            await axios.post("http://localhost:3000/api/signup", {
              name: user.name || profile?.name || "Unknown",
              email: user.email,
              avatar: user.image || profile?.image || "",
            });
          }
          return true;
        } catch (error: any) {
          console.error('Error creating user:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  secret: process.env.NEXT_AUTH_SECRET
};
