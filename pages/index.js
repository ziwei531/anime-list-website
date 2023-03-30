import { useState } from "react";
import AnimeList from "../components/AnimeList";
import ClientOnly from "../components/ClientOnly";
import SelectList from "../components/SelectList";
import AnimeSearch from "../components/AnimeSearch";

export default function Home({ search }) {
	const [selection, setSelection] = useState("TRENDING_DESC");
	// console.log("selection: " + selection);

	// if (search) {
	// 	setSearchTrue(true);
	// } else {
	// 	searchFalse;
	// }

	const [searchTrue, setSearchTrue] = useState(false);

	// console.log(search);
	return (
		<>
			<ClientOnly>
				<SelectList selection={setSelection} />

				{!searchTrue ? (
					<AnimeList selection={selection} />
				) : (
					<AnimeSearch search={search} />
				)}
				{/* <AnimeList selection={selection} /> */}
			</ClientOnly>
		</>
	);
}
