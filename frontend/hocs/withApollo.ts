import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost"
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = `${process.env.API_BASE_URL}/graphql` || "http://localhost:1337/graphql"; 

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: GRAPHQL_URL,
      cache: new InMemoryCache({fragmentMatcher}).restore(initialState || {})
    })
)