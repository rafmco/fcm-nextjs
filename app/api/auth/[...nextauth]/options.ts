import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "",
          type: "password",
          placeholder: "Senha",
        },
      },

      /* 1 - Compare Data with hardcoded User
      async authorize(credentials) {
        const user = {
          id: "1",
          email: "user@test",
          name: "Hardcoded User Test",
          password: "nextauth",
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          throw new Error("User not found.");
        }
      },
      */

      /* 2 - Get Data from database
      // Retrieve credentials from user tables
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        const hashedPassword = user.password;

        // Compare the plain-text password with the hashed password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
          // return user object with the their profile data
          return user;
        } else {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          return null;
        }
      },
      */

      /*
        3 - Retrieve user data from custom API to verify with credentials */
      async authorize(credentials, req) {
        const payload = {
          login: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch(
          `${process.env.API_HOST}:${process.env.API_PORT}/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();

        if (user.erro) {
          throw new Error(user.erro);
        }
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
