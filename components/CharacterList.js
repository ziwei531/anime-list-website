import Image from "next/image";

export default function CharacterList({ data }) {
	// console.log(Object.keys(data.Media.characters.edges));

	return (
		<div className="pl-1 pr-1">
			<h1 className="text-2xl text-center">Characters</h1>
			{/* lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 */}
			<div className="pt-5 pb-5 grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 items-center">
				{data.Media.characters.edges.map((character) => (
					<div
						key={character.node.id}
						className="
                        card text-xs lg:text-base w-128 lg:w-128 max-w-sm mt-3 border dark:bg-gray-600 dark:border-slate-400 bg-green-100 border-green-800
                        flex md:flex-row mx-auto pt-3 pb-3
                        justify-around drop-shadow-lg rounded-md 
                        
                    "
					>
						{/* Anime Character Section*/}

						<Image
							width={50}
							height={50}
							src={character.node.image.large}
							alt={character.node.name.userPreferred}
							className="rounded-lg w-16 lg:w-auto object-cover overflow-hidden block h-full"
							onError={(e) => {
								e.target.src = "../public/no_image.jpg";
							}}
						/>
						<p className="">{character.node.name.userPreferred}</p>

						{/* Voice Actor Section*/}

						{character.voiceActors.length > 0 && (
							<>
								<p className="">
									{character.voiceActors[0].name.userPreferred}
								</p>

								<Image
									width={50}
									height={50}
									src={character.voiceActors[0].image.medium}
									alt={character.voiceActors[0].name.userPreferred}
									className="rounded-lg w-16 lg:w-auto object-cover overflow-hidden block h-full"
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
