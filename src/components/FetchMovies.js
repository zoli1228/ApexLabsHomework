import Card from './Card'
import { useQuery } from "@apollo/client";
import Heading from './Heading'
import Spinner from './Spinner';
import SimilarMovies from './SimilarMovies';
import { HeadingCtx, MoviesCtx, WikiInfoCtx, SimilarCtx } from '../Context';
import { useContext, useEffect } from 'react';
import query from '../scripts/query'
import MovieDetails from './MovieDetails';
import BackToHomeBtn from './BackToHomeBtn';

const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"

export const FetchMovies = () => {

  const { movies, setMovies } = useContext(MoviesCtx)
  const { setHeading } = useContext(HeadingCtx)
  const { wikiInfo } = useContext(WikiInfoCtx)
  const { similarMovies } = useContext(SimilarCtx)

  let queryBuffer;
  if (movies.filter && !movies.search) queryBuffer = query.trending()
  if (movies.search) queryBuffer = query.search(movies.search)

  const { loading, error, data } = useQuery(queryBuffer);

  useEffect(() => {
    if (!loading && !error) {
      const storedMovies = data.movies || data.searchMovies
      setMovies(prevState => ({ ...prevState, listCount: storedMovies.length, movieObject: storedMovies }))
    }
  }, [data])

  useEffect(() => {
    if (movies.selected && !wikiInfo.showInfo) {
      setHeading(prevState => ({ ...prevState, mainHeading: "Movie Details" }))
    }
    if (wikiInfo.showInfo) {
      setHeading(prevState => ({ ...prevState, mainHeading: "Wikipedia results" }))
    }
    if (similarMovies.showSimilar) {
      setHeading(prevState => ({ ...prevState, mainHeading: "Related Movies" }))
    }
    if (!movies.selected && !movies.search && !similarMovies.showSimilar) {
      setHeading(prevState => ({ ...prevState, mainHeading: "Trending Now" }))
    }

  }, [movies, wikiInfo, similarMovies])

  if (loading) return <Spinner />;
  if (error) return (
    <div>
      <p>There has been a network error. Please try again later.</p>
      <BackToHomeBtn />
    </div>
  );
  const storedMovies = data.searchMovies || data.movies

  if (storedMovies.length < 1) {
    return <Heading.SubHeading text="Sorry, we couldn't find what you're looking for." />
  }

  if (movies.selected) {
    if (movies.selected.length > 0) {
      const storedMovies = movies.movieObject
      for (let movie of storedMovies) {
        if (movie.id === movies.selected) {
          return <MovieDetails data={movie} />
        }
      }
    }
  }
  if (similarMovies.showSimilar && movies.storedRelated) {
    return <SimilarMovies stored={storedMovies} selected={movies.storedRelated} />


  }

  return (
    storedMovies.map(({ id, name, releaseDate, img, adult, genres, score }) => (
      !adult ? <Card key={id} id={id} name={name} releaseDate={releaseDate} img={img ? img.url : noImage} genres={genres} score={score} /> : null
    )))
}


export default FetchMovies