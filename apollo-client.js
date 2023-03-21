import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
	uri: "https://graphql.anilist.co",
	cache: new InMemoryCache(),
});

export default client;
