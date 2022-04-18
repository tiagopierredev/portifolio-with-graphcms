import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl24nx6ud6mkv01xtew1h2jfb/master",
  cache: new InMemoryCache(),
});

export default client;
