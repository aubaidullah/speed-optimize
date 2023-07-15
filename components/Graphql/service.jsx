import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import * as Constant from '../Constants'
// Set `RestLink` with your endpoint


const restLink = new RestLink({ uri: Constant.api });
// Setup your client

const client = new ApolloClient({

  cache: new InMemoryCache(),
  // cache:null,

  link: restLink,
  defaultOptions:{
    watchQuery:{
      fetchPolicy:'cache-and-network',
      nextFetchPolicy:'cache-first'
    }
  }

});

export default client