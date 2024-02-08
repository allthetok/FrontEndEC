const Font25Sx = {
	fontSize: '25px',
}

const Font30Sx = {
	fontSize: '30px'
}

const PaddingNoneSx = {
	padding: '8px 4px 8px 0px'
}

const Font50Sx = {
	fontSize: '50px'
}

const AutoCompleteSx = {
	width: 250,
	borderRadius: '10px',
	marginRight: '0.75rem'
}

const DropDownOptionsSx = {
	minWidth: '250px',
	color: '#000',
	paddingLeft: '0',
	fontSize: '1rem',
	textTransform: 'capitalize',
	'&:hover': {
		textDecoration: 'underline',
		textUnderlineOffset: '0.375rem',
		bgcolor: 'transparent'
	}
}

const CheckBoxSx = {
	paddingRight: '0.25rem',
	'&:hover': {
		bgcolor: 'transparent'
	},
	'&.Mui-checked': {
		color: '#000'
	}
}

const SizeButtonSx = {
	color: '#000',
	fontWeight: 'bold',
	border: '1px solid gray',
	'&:hover': {
		color: '#fff',
		backgroundColor: '#4F46E5 !important',
		border: '1px solid black '
	}
}

const ActiveSizeButtonSx = {
	color: '#fff',
	fontWeight: 'bold',
	border: '2px solid black',
	backgroundColor: '#4F46E5 !important'
}

const AddToCartSx = {
	textTransform: 'capitalize'
}

const AdditionalCartSx = {
	textTransform: 'capitalize',
	font: 'bold',
	display: 'flex',
	color: 'white',
	backgroundColor: 'rgb(99 102 241 / 1)',
	borderWidth: '0px',
	padding: '0.75rem 2.5rem',
	fontSize: '1.125rem',
	lineHeight: '1.75rem',
	borderRadius: '9999px',
	'&:focus': {
		outline: '2px solid transparent',
		outlineOffset: '2px'
	},
	'&:hover': {
		backgroundColor: 'rgb(79 70 229 / 1)'
	}
}

const RemoveCartSx = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	textTransform: 'capitalize',
	font: 'bold',
	color: 'white',
	backgroundColor: '#a9a9a9',
	borderWidth: '0px',
	padding: '0.75rem 2.5rem',
	fontSize: '1.125rem',
	borderRadius: '9999px',
	maxWidth: '120px',
	'&:focus': {
		outline: '2px solid transparent',
		outlineOffset: '2px'
	},
	'&:hover': {
		backgroundColor: 'rgb(79 70 229 / 1)'
	}
}


const LabelSx = {
	maxWidth: '320px'
}

const OpacitySx = {
	opacity: '0.9'
}

const Font35Sx = {
	fontSize: '35px',
	paddingTop: '5px'
}

const CheckOutSx = {
	display: 'inline-flex',
	alignItem: 'center',
	justifyContent: 'center',
	borderRadius: '0.375rem',
	lineHeight: '1.25rem',
	letterSpacing: '0px',
	fontSize: '0.875rem',
	textTransform: 'capitalize',
	transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
	transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	transitionDuration: '150ms',
	'&:focus-visible': {
		outline: '2px solid transparent',
		outlineOffset: '2px',
		ringOffsetWidth: '2px',

	},
	'&:disabled': {
		opacity: '0.5',
		pointerEvents: 'none',
		color: 'rgb(255,255,255,1)'
	},
	backgroundColor: 'rgb(15,23,42,1)',
	color: 'rgb(255,255,255,1)',
	'&:hover': {
		backgroundColor: 'rgb(15,23,42,0.9)',
		fontWeight: '700',
	},
	height: '2.5rem',
	padding: '0.5rem 1rem',
	width: '100%',
}

export { Font25Sx, Font30Sx, PaddingNoneSx, Font50Sx, Font35Sx, AutoCompleteSx, DropDownOptionsSx, CheckBoxSx, SizeButtonSx, ActiveSizeButtonSx, AddToCartSx, LabelSx, OpacitySx, AdditionalCartSx, RemoveCartSx, CheckOutSx }