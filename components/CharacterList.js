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
                        card dark:bg-gray-600 dark:border-slate-400 bg-green-100 border-green-800
                        mx-auto w-96 lg:w-128 gap-3 mt-3 border
                        drop-shadow-lg rounded-md overflow-hidden
                    "
					>
						{/* Anime Character Section*/}

						<div className="character">
							<Image
								width={50}
								height={50}
								src={character.node.image.large}
								alt={character.node.name.userPreferred}
								className="image w-20 bg-center rounded-lg object-cover overflow-hidden h-full"
								onError={(e) => {
									e.target.src = "../public/no_image.jpg";
								}}
							/>
							<p className="name break-all p-1">
								{character.node.name.userPreferred}
							</p>
						</div>

						{/* Voice Actor Section*/}

						{character.voiceActors.length > 0 && (
							<div className="VA">
								<p className="name text-sm break-all p-1">
									{character.voiceActors[0].name.userPreferred}
								</p>

								<Image
									width={50}
									height={50}
									src={character.voiceActors[0].image.medium}
									alt={character.voiceActors[0].name.userPreferred}
									className="image bg-center w-20 rounded-lg object-cover overflow-hidden h-full"
									onError={(e) => {
										e.target.src = "../public/no_image.jpg";
									}}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
