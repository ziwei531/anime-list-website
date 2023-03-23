import Image from "next/image";

export default function CharacterList({ data }) {
	// console.log(Object.keys(data.Media.characters.edges));

	return (
		<div className="pr-10 pl-10">
			<h1 className="text-2xl text-center">Characters</h1>
			<div className="pt-5 pb-5 grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 items-center align-middle justify-center">
				{data.Media.characters.edges.map((character) => (
					<div
						key={character.node.id}
						className="
                        card p-4 w-80 sm:w-96 mt-3 border dark:bg-gray-600 dark:border-slate-400 bg-green-100 border-green-800
                        flex md:flex-row mx-auto
                        justify-around drop-shadow-lg rounded-md 
                        
                    "
					>
						{/* Anime Character Section*/}
						<Image
							width={50}
							height={50}
							src={character.node.image.large}
							alt={character.node.name.userPreferred}
							className="rounded-lg w-full h-full"
							onError={(e) => {
								e.target.src = "../public/no_image.jpg";
							}}
						/>
						<p className="p-3">{character.node.name.userPreferred}</p>
						{/* Voice Actor Section*/}

						{character.voiceActors.length > 0 && (
							<>
								<p className="p-3">
									{character.voiceActors[0].name.userPreferred}
								</p>
								<Image
									width={50}
									height={50}
									src={character.voiceActors[0].image.medium}
									alt={character.voiceActors[0].name.userPreferred}
									className="rounded-lg w-full h-full"
									onError={(e) => {
										e.target.src = "../public/no_image.jpg";
									}}
								/>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
