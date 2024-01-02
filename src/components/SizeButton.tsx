import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '@mui/material'
import { sizes } from '@/helpers/mockdata'
import { ActiveSizeButtonSx, SizeButtonSx } from '@/sx/styling'

type SizeButtonProps = {
	sizeOption: string,
	setSizeOption: Dispatch<SetStateAction<string>>
}

const SizeButton = ({ sizeOption, setSizeOption }: SizeButtonProps) => {
	return (
		<ul className='flex flex-row justify-center flex-wrap gap-2'>
			{sizes.map((item: string, index: number) => (
				<li key={index}>
					<Button variant='text' sx={item === sizeOption ? ActiveSizeButtonSx : SizeButtonSx} onClick={() => setSizeOption(item)}>
						{item}
					</Button>
				</li>
			)
			)}
		</ul>
	)
}

export { SizeButton }