import "@components/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/navbar";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Footer from "../components/Footer";
import { useState } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
	const [search, setSearch] = useState("");
	return (
		<ApolloProvider client={client}>
			<ThemeProvider>
				<Head>
					<title>Simple Anime List Application</title>
					<meta
						name="description"
						content="A Simple Anime List Application. Developed by Whoong Zi Wei"
						key="desc"
					/>
					<meta name="mobile-web-app-capable" content="yes"></meta>
				</Head>
				<Navbar search={setSearch} />
				<Component {...pageProps} search={search} />
				<Footer />
			</ThemeProvider>
		</ApolloProvider>
	);
}
