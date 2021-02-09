import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import '../styles/imports.css';
import '../styles/theme.css';

const theme = createMuiTheme({
	palette: {
		common: { black: '#000', white: '#fff' },
		background: {
			paper: 'rgba(255, 255, 255, 1)',
			default: 'rgba(245, 241, 238, 1)',
		},
		primary: {
			light: 'rgba(83, 103, 174, 1)',
			main: 'rgba(30, 61, 126, 1)',
			dark: 'rgba(0, 24, 81, 1)',
			contrastText: '#fff',
		},
		secondary: {
			light: 'rgba(206, 73, 55, 1)',
			main: 'rgba(150, 16, 15, 1)',
			dark: 'rgba(98, 0, 0, 1)',
			contrastText: '#fff',
		},
		error: {
			light: '#e57373',
			main: '#f44336',
			dark: '#d32f2f',
			contrastText: '#fff',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
		},
	},
});

export default function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
