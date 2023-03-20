import { useState } from "react";
import { request } from "graphql-request";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ data }) {
	if (!data) return <p className="text-center text-3xl">Loading...</p>;

	return (
		<>
			<div className="p-10 grid grid-cols-2 sm:grid-cols-5 justify-evenly">
				{data.Page.media.map((anime) => (
					<div key={anime.id} className="p-2 mb-2">
						<Image
							src={anime.coverImage.extraLarge}
							alt={anime.title.userPreferred}
							width={300}
							height={300}
							className="rounded-lg shadow-lg ease-in transition-all duration-150 sm:hover:scale-110 sm:hover:ease-infont shadow-gray-500 hover:shadow-gray-700 cursor-pointer dark:shadow-blue-500 dark:hover:shadow-blue-700"
						/>
						<h3 className="mt-2 truncate text-center">
							{anime.title.userPreferred}
						</h3>
					</div>
				))}
			</div>
		</>
	);
}

//query api location
export async function getServerSideProps() {
	const QUERY = gql`
		query GetAnime {
			Page(page: 1, perPage: 50) {
				media(type: ANIME, sort: TRENDING_DESC) {
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

	try {
		const { data } = await client.query({
			query: QUERY,
		});
		// console.log(data.Page);

		return { props: { data } }; // make sure to return an object with a props property
	} catch (error) {
		console.error(error);
		return { props: { error } };
	}

	console.log("Ring ni Kakero 1".length);
}
