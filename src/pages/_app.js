import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import '../styles/imports.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1e3d80',
		},
		secondary: {
			main: '#aa1616',
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
