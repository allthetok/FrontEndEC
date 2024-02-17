/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import Link from 'next/link'
import { stripe } from '../../../../lib/stripe'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullProductConfig, ProductObj, ProductResponseObj } from '@/helpers/types/fetypes'
import { FullProductServer } from '@/components/Server/FullProductServer'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

interface Props {
	searchParams: {
		session_id?: string
	}
}

const SuccessPage = async ({ searchParams }: Props) => {
	const sessionId = searchParams?.session_id ?? ''
	const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
	const checkoutItems = checkoutSession.line_items
	const userDetails = await getServerSession(options)
	return (
		<div>
			Hello
		</div>
	)
}



export default SuccessPage