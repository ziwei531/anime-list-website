import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/loading";
import CharacterList from "../../components/CharacterList";
import AnimeDescription from "../../components/AnimeDescription";

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
			status
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
							medium
						}
					}
					role
					voiceActors {
						id
						name {
							userPreferred
						}
						image {
							large
							medium
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

	if (loading) return <Loading />;
	if (!data) return null;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<>
			<AnimeDescription data={data} />
			{/* Characters Section */}
			{data.Media.characters.edges.length > 0 ? (
				<CharacterList data={data} />
			) : (
				<h1 className="text-2xl text-center p-5 ">No Characters Found</h1>
			)}
		</>
	);
}
