import Loading from "./loading";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

/*

( $page: Int!, $perPage: Int! ) will be used in the useQuery hook

const { loading, error, data, fetchMore } = useQuery(QUERY, {
    variables: { page: 1, perPage: PER_PAGE }, <-- define it 
    
*/

function checkSeason() {
	const currentMonth = new Date().getMonth();

	let season;
	//december until february
	if ((currentMonth >= 0 && currentMonth <= 1) || currentMonth === 11) {
		season = "WINTER";
	} else if (currentMonth >= 2 && currentMonth <= 4) {
		season = "SPRING";
	} else if (currentMonth >= 5 && currentMonth <= 7) {
		season = "SUMMER";
	} else if (currentMonth >= 8 && currentMonth <= 10) {
		season = "FALL";
	}
	return season;
}

function findNextSeason(curSeason) {
	/*
	WINTER
	Months December to February

	SPRING
	Months March to May

	SUMMER
	Months June to August

	FALL
	Months September to November
	*/
	let nextSeason;
	if (curSeason === "WINTER") {
		nextSeason = "SPRING";
	} else if (curSeason === "SPRING") {
		nextSeason = "SUMMER";
	} else if (curSeason === "SUMMER") {
		nextSeason = "FALL";
	} else if (curSeason === "FALL") {
		nextSeason = "WINTER";
	}
	return nextSeason;
}

function query(selection) {
	let QUERY;
	const currentYear = new Date().getFullYear();
	const currentSeason = checkSeason();
	const nextSeason = findNextSeason(currentSeason);

	// if either PTS and PUS, need a different way of querying it.
	// PUS = Popular Upcoming Season, PTS = Popular This Season
	if (selection === "PUS") {
		QUERY = gql`
		query GetAnime($page: Int!, $perPage: Int!) {
			Page(page: $page, perPage: $perPage) {
				pageInfo {
					hasNextPage
					currentPage
				}
				media(type: ANIME, sort: POPULARITY_DESC, season: ${nextSeason}, seasonYear: ${currentYear}) {
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
	} else if (selection === "PTS") {
		QUERY = gql`
		query GetAnime($page: Int!, $perPage: Int!) {
			Page(page: $page, perPage: $perPage) {
				pageInfo {
					hasNextPage
					currentPage
				}
				media(type: ANIME, sort: POPULARITY_DESC, season: ${currentSeason}, seasonYear: ${currentYear}) {
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
	} else {
		QUERY = gql`
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
	}

	return QUERY;
}

export default function AnimeList({ selection }) {
	const QUERY = query(selection);

	const PER_PAGE = 20;
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
					<Link key={anime.id} href={`/anime/${anime.id}`}>
						<div className="p-2 mb-2">
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
					</Link>
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
