import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { cache } from "./cache";

export const apolloClient = new ApolloClient({
	cache,
	uri: "http://localhost:3000/graphql",
});
