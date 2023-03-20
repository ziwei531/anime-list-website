import "@components/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/navbar";

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<Navbar />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
