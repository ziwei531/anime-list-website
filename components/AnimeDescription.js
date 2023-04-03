import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

function capitalizeCorrection(str) {
	str = str.toLowerCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function AnimeDescription({ data }) {
	return (
		<>
			<div className="p-10 align-middle flex flex-col lg:flex-row ">
				<Image
					width={350}
					height={300}
					alt={data.Media.title}
					src={data.Media.coverImage.extraLarge}
					className="rounded-lg mx-auto"
				/>
				<div className="pt-10 pb-10 pl-5 pr-5 md:pl-20 md:pr-20">
					<h1 className="text-2xl">Description</h1>
					<p className="leading-8">{ReactHtmlParser(data.Media.description)}</p>
					<div className="flex flex-col md:flex-row text-center mt-5 md:items-start">
						<span
							className="
						p-3 border dark:bg-gray-600  dark:border-slate-400 
						bg-green-300 border-green-600
						rounded-lg mt-3 md:mr-3"
						>
							Mean Score: {data.Media.meanScore}
						</span>
						<span
							className="
						p-3 border dark:bg-gray-600  dark:border-slate-400 
						bg-green-300 border-green-600
						rounded-lg mt-3 md:mr-3"
						>
							Popularity: {data.Media.popularity}
						</span>
						<span
							className="
						p-3 border dark:bg-gray-600  dark:border-slate-400 
						bg-green-300 border-green-600
						rounded-lg mt-3 md:mr-3"
						>
							Genre:{" "}
							{data.Media.genres.map((genre) => {
								if (data.Media.genres[data.Media.genres.length - 1] === genre) {
									return genre;
								} else {
									return genre + ", ";
								}
							})}
						</span>
						<span
							className="
							p-3 border dark:bg-gray-600  dark:border-slate-400 
						  bg-green-300 border-green-600
							rounded-lg mt-3 md:mr-3"
						>
							Status: {capitalizeCorrection(data.Media.status)}
						</span>

						{data.Media.episodes !== null && (
							<span
								className="
                                    p-3 border dark:bg-gray-600  dark:border-slate-400 
                                  bg-green-300 border-green-600
                                    rounded-lg mt-3 md:mr-3"
							>
								Total Episodes: {data.Media.episodes}
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
