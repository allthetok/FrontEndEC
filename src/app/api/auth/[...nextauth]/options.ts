/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import TwitchProvider from 'next-auth/providers/twitch'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createNativeLoginConfig, createOAuthConfig, createUserExistConfig } from '@/helpers/fctns'
import { OAuthConfig, UserExistConfig } from '@/helpers/types/fetypes'

export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			// profile: async function (profile) {
			profile: async (profile) => {
				const oauthProviderConfig: OAuthConfig = createOAuthConfig('post', 'loginExternal', profile.email, profile?.email_verified, profile.sub, 'Google')
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
					.catch((err: AxiosError) => null)
					// .catch((err: AxiosError) => {
					// 	return null
					// })
				return {
					id: internalDBUser?.id,
					email: profile.email,
					externalId: profile.sub,
					provider: internalDBUser?.provider,
					prevLogin: internalDBUser?.prevLogin
				}
			}
		}),
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			profile: async (profile) => {
				const oauthProviderConfig: OAuthConfig = createOAuthConfig('post', 'loginExternal', profile.email, false, profile.id, 'Spotify')
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
					.catch((err: AxiosError) => null)
				return {
					email: profile.email,
					id: internalDBUser?.id,
					externalId: profile.id,
					provider: internalDBUser?.provider,
					prevLogin: internalDBUser?.prevLogin
				}
			}
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			profile: async (profile) => {
				const oauthProviderConfig: OAuthConfig = createOAuthConfig('post', 'loginExternal', profile.email, profile.verified, profile.id, 'Discord')
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
					.catch((err: AxiosError) => null)
				return {
					email: profile.email,
					id: internalDBUser?.id,
					externalId: profile.id,
					provider: internalDBUser?.provider,
					prevLogin: internalDBUser?.prevLogin
				}
			}
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			profile: async (profile) => {
				const oauthProviderConfig: OAuthConfig = createOAuthConfig('post', 'loginExternal', profile.email, false, profile.id, 'Github')
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
					.catch((err: AxiosError) => null)
				return {
					email: profile.email,
					id: internalDBUser?.id,
					externalId: profile.id,
					provider: internalDBUser?.provider,
					prevLogin: internalDBUser?.prevLogin
				}
			}
		}),
		TwitchProvider({
			clientId: process.env.TWITCH_CLIENT_ID as string,
			clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
			profile: async (profile) => {
				const oauthProviderConfig: OAuthConfig = createOAuthConfig('post', 'loginExternal', profile.email, false, profile.sub, 'Twitch')
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
					.catch((err: AxiosError) => null)
				return {
					email: profile.email,
					id: internalDBUser?.id,
					externalId: profile.sub,
					provider: internalDBUser?.provider,
					prevLogin: internalDBUser?.prevLogin
				}
			}
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email:',
					type: 'email',
					placeholder: 'example@example.com'
				},
				password: {
					label: 'Password:',
					type: 'password'
				}
			},
			authorize: async (credentials) => {
				const userStatusConfig: UserExistConfig = createUserExistConfig('post', 'resolveUser', credentials!.email, 'ATKNative')
				const userStatus = await axios(userStatusConfig)
					.then((response: AxiosResponse) => {
						return response.status === 200 ?
							{ userExists: response.data.userExists } : { userExists: false }
					})
					.catch((err: AxiosError) => {
						return { userExists: false }
					})
				// if (userStatus.userExists) {
				// 	const loginConfig = createNativeLoginConfig('post', 'login', credentials!.email, credentials!.password, 'ATKNative')
				// 	userObj = await axios(loginConfig)
				// 		.then((response: AxiosResponse) => {
				// 			return response.status === 200 ?
				// 				{
				// 					id: response.data.id,
				// 					email: response.data.email,
				// 					provider: response.data.provider,
				// 					prevLogin: response.data.prevlogin
				// 				} : null
				// 		})
				// 		.catch((err: AxiosError) => null)
				// }
				// else {
				// 	const signUpConfig = createNativeLoginConfig('post', 'createUser', credentials!.email, credentials!.password, 'ATKNative')
				// }
				const nativeAuthConfig = createNativeLoginConfig('post', userStatus.userExists ? 'login' : 'createUser', credentials!.email, credentials!.password, 'ATKNative')
				const userObj = await axios(nativeAuthConfig)
					.then((response: AxiosResponse) => {
						return response.status === 200 ?
							{
								id: response.data.id,
								email: response.data.email,
								provider: response.data.provider,
								prevLogin: response.data.prevlogin
							} : null
					})
					.catch((err: AxiosError) => null)
				return userObj
			},
		})
	],
	pages: {

	},

}