import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import * as Constant from '../Constants'
// Set `RestLink` with your endpoint


const restLink = new RestLink({ uri: Constant.api });
// Setup your client

const client = new ApolloClient({

  cache: new InMemoryCache(),

  link: restLink

});

export default client