import Loading from "./loading";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";

/*

( $page: Int!, $perPage: Int! ) will be used in the useQuery hook

const { loading, error, data, fetchMore } = useQuery(QUERY, {
    variables: { page: 1, perPage: PER_PAGE }, <-- define it 
    
*/

function query(selection) {
	const QUERY = gql`
		query GetAnime($page: Int!, $perPage: Int!) {
			Page(page: $page, perPage: $perPage) {
				pageInfo {
					hasNextPage
					currentPage
				}
				media(type: ANIME, sort: ${selection}) {
					id
					title {
						userPreferred
					}
					coverImage {
						extraLarge
					}
				}
			}
		}
	`;

	return QUERY;
}

export default function AnimeList({ selection }) {
	// console.log("Inside AnimeList " + selection);

	const QUERY = query(selection);

	console.log(QUERY);

	const PER_PAGE = 50;
	const { loading, error, data, fetchMore } = useQuery(QUERY, {
		variables: { page: 1, perPage: PER_PAGE },
	});

	const handleFetchMore = () => {
		fetchMore({
			variables: {
				page: data.Page.pageInfo.currentPage + 1,
				perPage: PER_PAGE,
			},
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;

				console.log(...fetchMoreResult.Page.media);
				return {
					Page: {
						__typename: "Page",
						pageInfo: fetchMoreResult.Page.pageInfo,
						media: [...prevResult.Page.media, ...fetchMoreResult.Page.media],
					},
				};
			},
		});
	};

	if (loading) return <Loading />;
	if (!data) return null;
	if (error)
		return <p className="p-10 text-center text-3xl">Error : {error.message}</p>;

	return (
		<>
			<div className="p-10 grid grid-cols-2 md:grid-cols-5 sm:grid-cols-4 justify-evenly">
				{data.Page.media.map((anime, index) => (
					<div key={anime.id} className="p-2 mb-2">
						<Image
							src={anime.coverImage.extraLarge}
							alt={anime.title.userPreferred}
							width={300}
							height={300}
							className="rounded-lg shadow-lg ease-in transition-all duration-150 sm:hover:scale-110 sm:hover:ease-infont shadow-gray-500 hover:shadow-gray-700 cursor-pointer dark:shadow-blue-500 dark:hover:shadow-blue-700"
						/>
						<h3 className="mt-2 md:text-xl sm:text-lg truncate text-center">
							{anime.title.userPreferred}
						</h3>
						<h3 className="mt-2 md:text-2xl sm:text-xl text-center">
							#{index + 1}
						</h3>
					</div>
				))}
			</div>

			<div className="pb-8 flex justify-center">
				<button
					onClick={handleFetchMore}
					disabled={!data.Page.pageInfo.hasNextPage}
					className="hover:bg-cyan-600 hover:text-slate-50 transition-all ease-in p-3 rounded-full bg-cyan-400 font-semibold"
				>
					{data.Page.pageInfo.hasNextPage
						? "Load More"
						: "No more data to load"}
				</button>
			</div>
		</>
	);
}
