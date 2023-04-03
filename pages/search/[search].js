import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/loading";
import Image from "next/image";
import Link from "next/link";

const query = (search) => gql`
		query GetAnime($page: Int!, $perPage: Int!) {
			Page(page: $page, perPage: $perPage) {
				pageInfo {
					hasNextPage
					currentPage
				}
				media(type: ANIME, search: "${search}") {
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

export default function AnimeSearch() {
	const router = useRouter();
	let { search } = router.query;

	if (search) {
		let regex = /(-[a-z])/g;
		search = search.replace(regex, (x) => {
			return " " + x[1].toUpperCase();
		});

		search = search.charAt(0).toUpperCase() + search.slice(1);
	}

	const QUERY = query(search);

	const PER_PAGE = 20;
	const { loading, error, data } = useQuery(QUERY, {
		variables: { page: 1, perPage: PER_PAGE },
	});

	if (loading) return <Loading />;
	if (!data) return null;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<div className="p-10 grid grid-cols-2 md:grid-cols-5 sm:grid-cols-4 justify-evenly">
				{data.Page.media.map((anime) => (
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
						</div>
					</Link>
				))}
			</div>
		</>
	);
}
