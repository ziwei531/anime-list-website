import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import client from "../../apollo-client";
import Loading from "../../components/loading";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";

/*
Goal: Get the animeID from the URL and use it to query the API for the anime's data
Create getStaticPaths 
Create getStaticProps
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
			<div className="p-10 align-middle flex flex-col sm:flex-row justify-center">
				<Image
					width={300}
					height={300}
					alt={data.title}
					src={data.Media.coverImage.extraLarge}
					className="rounded-lg h-90 mx-auto"
				/>
				<div className="pt-10 pb-10 pl-20 pr-20">
					<h1 className="text-2xl">Description</h1>
					<p className="leading-8">{ReactHtmlParser(data.Media.description)}</p>
				</div>
			</div>

			{/* Characters Section */}
			<div className="p-10">
				<h1 className="text-2xl text-center">Characters</h1>
			</div>
		</>
	);
}

// export async function getStaticPaths() {
// 	const { data } = await client.query({
// 		query: query(animeID),
// 	});

// 	const paths = [{ params: { anime: data.Media.id.toString() } }];

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }

// export async function getStaticProps() {
// 	const { data } = await client.query({
// 		query: query(animeID),
// 	});

// 	return {
// 		props: {
// 			data: data,
// 		},
// 	};
// }
