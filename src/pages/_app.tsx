import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import { Provider, createClient } from "urql";

import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
	const client = createClient({
		url: "http://localhost:4000/graphql",
		fetchOptions: {
			credentials: "include", // Send cookie with requests
		},
	});

	return (
		<Provider value={client}>
			<ThemeProvider theme={theme}>
				<CSSReset />
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
