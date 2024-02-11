/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import TwitchProvider from 'next-auth/providers/twitch'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createOAuthConfig } from '@/helpers/fctns'

export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			profile: async function (profile) {
				const oauthProviderConfig = createOAuthConfig('post', 'loginExternal', profile.email, profile.email_verified, profile.sub, 'Google')
				const internalDBUser = await axios(oauthProviderConfig)
					.then((response: AxiosResponse) => {
						return response.status === 200 ?
							{
								id: response.data.id,
								email: response.data.email,
								provider: response.data.provider,
								prevLogin: response.data.prevlogin
							} : null
					})
					.catch((err: AxiosError) => {
						return null
					})
				return {
					id: internalDBUser?.id,
					email: profile.email,
					externalId: profile.sub,
					provider: internalDBUser?.provider,
					prevLogin: internalDBUser?.prevLogin
				}
			}
		})
	],
	pages: {

	},

}