import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import auth0Provider from "next-auth/providers/auth0";
import z from "zod";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/db/database";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH0_SECRET,
  // @ts-expect-error
  adapter: KyselyAdapter(db),
  providers: [
    auth0Provider({
      clientId: z.string().parse(process.env.AUTH0_CLIENT_ID),
      clientSecret: z.string().parse(process.env.AUTH0_CLIENT_SECRET),
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
    /**זז
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};

