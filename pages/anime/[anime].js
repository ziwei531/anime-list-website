import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/loading";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";

/*
Goal: Get the animeID from the URL and use it to query the API for the anime's data

*/

const QUERY = gql`
	query GetAnime($id: Int!) {
		Media(type: ANIME, id: $id) {
			id
			title {
				userPreferred
			}
			coverImage {
				extraLarge
			}
			episodes
			genres
			description
			averageScore
			meanScore
			popularity
			characters {
				edges {
					node {
						id
						name {
							userPreferred
						}
						image {
							large
						}
					}
					role
					voiceActors {
						id
						name {
							userPreferred
						}
					}
				}
			}
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
		}
	}
`;

export default function Description() {
	const router = useRouter();
	const animeID = router.query.anime;

	const { loading, error, data } = useQuery(QUERY, {
		variables: { id: parseInt(animeID) },
	});

	//finally working
	// console.log("Query succeeded. Here is the query: " + JSON.stringify(data));

	console.log(data);

	if (loading) return <Loading />;
	if (!data) return null;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<>
			<div className="p-10 align-middle flex flex-col lg:flex-row ">
				<Image
					width={300}
					height={300}
					alt={data.Media.title}
					src={data.Media.coverImage.extraLarge}
					className="rounded-lg mx-auto"
				/>
				<div className="pt-10 pb-10 pl-5 pr-5 md:pl-20 md:pr-20">
					<h1 className="text-2xl">Description</h1>
					<p className="leading-8">{ReactHtmlParser(data.Media.description)}</p>
					<div className="flex flex-col md:flex-row text-center mt-5">
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
					</div>
				</div>
			</div>

			{/* Characters Section */}
			<div className="p-10">
				<h1 className="text-2xl text-center">Characters</h1>
			</div>
		</>
	);
}
