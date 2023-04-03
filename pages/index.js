import { useState } from "react";
import AnimeList from "../components/AnimeList";
import ClientOnly from "../components/ClientOnly";
import SelectList from "../components/SelectList";

export default function Home({ search }) {
	const [selection, setSelection] = useState("TRENDING_DESC");

	return (
		<>
			<ClientOnly>
				<SelectList selection={setSelection} />
				<AnimeList selection={selection} />
			</ClientOnly>
		</>
	);
}
