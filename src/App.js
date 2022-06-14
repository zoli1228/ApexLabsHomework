import './style/App.css';
import './style/movieList.css'
import FetchMovies from './components/FetchMovies'

import Heading from './components/Heading'
import React from 'react';
import { HeadingProvider, IMDbProvider, MoviesProvider, SimilarProvider, WikiInfoProvider, SearchBarProvider } from './Context';

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient
} from '@apollo/client'
import WikiDetails from './components/WikipediaDetails';

const MOVIES_API = "https://tmdb.sandbox.zoosh.ie/dev/grphql"
const client = new ApolloClient({
  uri: MOVIES_API,
  cache: new InMemoryCache()
});
function App() {


  return (
    <MoviesProvider>
      <SimilarProvider>
        <HeadingProvider>
          <WikiInfoProvider>
            <IMDbProvider>
              <SearchBarProvider>
                <ApolloProvider client={client}>
                  <div className='App'>
                    <Heading.Main />
                    <div className='MovieContainer'>
                      <FetchMovies />
                      <WikiDetails />
                    </div>
                    {/* <Heading.SubHeading /> */}
                  </div >
                </ApolloProvider>
              </SearchBarProvider>
            </IMDbProvider>
          </WikiInfoProvider>
        </HeadingProvider>
      </SimilarProvider>
    </MoviesProvider>


  );
}

export default App;
