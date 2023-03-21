import "@components/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/navbar";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider>
				<Navbar />
				<Component {...pageProps} />
				<Footer />
			</ThemeProvider>
		</ApolloProvider>
	);
}
