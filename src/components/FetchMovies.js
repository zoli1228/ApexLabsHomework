import Card from './Card'
import { useQuery } from "@apollo/client";
import Heading from './Heading'
import Spinner from './Spinner';
import { HeadingCtx, MoviesCtx } from '../Context';
import { useContext, useEffect } from 'react';
import query from '../scripts/query'
import MovieDetails from './MovieDetails';

const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"

export const FetchMovies = () => {

  const { movies, setMovies } = useContext(MoviesCtx)
  const { setHeading } = useContext(HeadingCtx)

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
    if (movies.listCount === 1) {
      setMovies(prevState => ({ ...prevState, movieObject: data.searchMovies }))
    }
    if (movies.selected) {
      console.log("Movie selected: " + movies.selected)
    }

  }, [movies.listCount])

  if (loading) return <Spinner />;
  if (error) return <p>There has been a network error. Please try again later.{error}</p>;
  const storedMovies = data.searchMovies || data.movies

  if (storedMovies.length < 1) {
    return <Heading.SubHeading text="Sorry, we couldn't find what you're looking for." />
  }
  let myMovie;
  if (movies.selected) {
    if(movies.selected.length > 0) {
      movies.movieObject.map(elem => {
        if(elem.id === movies.selected) {
          myMovie = <MovieDetails data={elem} />
        } else {
          return
        }
      })
    }
    if(myMovie) return myMovie
  }

  return (
    storedMovies.map(({ id, name, releaseDate, img, adult, genres, score }) => (
      !adult ? <Card key={id} id={id} name={name} releaseDate={releaseDate} img={img ? img.url : noImage} genres={genres} score={score} /> : null
    )))
}


export default FetchMovies