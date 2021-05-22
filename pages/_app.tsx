import { memo } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//
import '../styles/globals.scss';
import '../styles/mui-overide.scss';

declare global {
	interface Window {
		twttr: any;
	}
}

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgb(65, 179, 162)',
		},
		secondary: {
			main: 'rgb(226, 125, 95)',
		},
	},
});

const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default memo(MyApp);
