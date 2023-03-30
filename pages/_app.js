import "@components/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/navbar";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Footer from "../components/Footer";
import { useState } from "react";

export default function App({ Component, pageProps }) {
	const [search, setSearch] = useState("");
	return (
		<ApolloProvider client={client}>
			<ThemeProvider>
				<Navbar search={setSearch} />
				<Component {...pageProps} search={search} />
				<Footer />
			</ThemeProvider>
		</ApolloProvider>
	);
}
