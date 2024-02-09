'use client'
import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Checkbox, FormControlLabel } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import { createUserExistConfig, regexValidEmail } from '../helpers/fctns'

const Login = () => {
	return (
		<div>
			Login page
		</div>
	)
}

export { Login }