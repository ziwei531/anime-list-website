import {
	ApolloClient,
	InMemoryCache,
	defaultDataIdFromObject,
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
	uri: "https://graphql.anilist.co",
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					Page: {
						keyArgs: ["sort", "type"],
						merge(existing = {}, incoming, { args }) {
							const merged = existing ? { ...existing } : {};
							const { media: existingMedia = [] } = merged;
							const { media: incomingMedia = [] } = incoming;
							const mergedMedia = [...existingMedia];
							const idSet = new Set(existingMedia.map((media) => media.__ref));
							incomingMedia.forEach((media) => {
								if (!idSet.has(media.__ref)) {
									idSet.add(media.__ref);
									mergedMedia.push(media);
								}
							});
							merged.media = mergedMedia;
							return merged;
						},
					},
				},
			},
		},
		dataIdFromObject: (object) => {
			switch (object.__typename) {
				case "Media":
					return object.id;
				default:
					return defaultDataIdFromObject(object);
			}
		},
	}),
});

export default client;
