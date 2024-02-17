/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
		email: string,
		externalId: string | null,
		id: string,
		provider: string,
		name: string | null | undefined,
		image: string | null | undefined,
    }
  }
}