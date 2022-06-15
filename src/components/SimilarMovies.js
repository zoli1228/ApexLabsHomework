import { HeadingCtx, MoviesCtx, SimilarCtx } from "../Context"
import { useContext, useEffect } from "react"
import { useQuery } from "@apollo/client";
import query from '../scripts/query'
import Card from './Card'
import Spinner from "./Spinner";
import '../style/similarMovies.css'
import BackToHomeBtn from "./BackToHomeBtn";

const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"

const SimilarMovies = (props) => {
    const { similarMovies, setSimilarMovies } = useContext(SimilarCtx)
    const { movies, setMovies } = useContext(MoviesCtx)

    const { loading, error, data } = useQuery(query.similarMovies(similarMovies.searchTerm));

    useEffect(() => {
        if(data && similarMovies.showSimilar) {
            setSimilarMovies(prevState => ({...prevState, movies: props.stored}))
            setMovies(prevState => ({...prevState, movieObject: data.searchMovies[0].similar, selected: ""}))
        } /* else if(!similarMovies.showSimilar) {
            setMovies(prevState => ({...prevState, movieObject: props.stored, selected: props.selected}))
        } */
    }, [data])
    if (loading) return <Spinner />
    if (error) {
        return (
            <div>
                <p>Error looking for related movies. :(</p>
                <BackToHomeBtn />
            </div>
        )
    }
    
    if(props.stored != movies.movieObject) {
        const relatedMovies = movies.movieObject
        return (
            <div className="similar-moviecontainer">
                <div className="similar-btncontainer">
                    <a onClick={() => {
                        setSimilarMovies(prevState => ({...prevState, showSimilar: false}))
                        setMovies(prevState => ({...prevState, movieObject: props.stored, selected: props.selected, storedRelated: false}))
                    }}>
                        Go Back
                    </a>
                </div>
                {relatedMovies.map((({ id, name, releaseDate, img, adult, genres, score }) => {
                    return !adult ? <Card key={id} id={id} name={name} releaseDate={releaseDate} img={img ? img.url : noImage} genres={genres} score={score} /> : null
                }))}

            </div>
        )
    }
}




export default SimilarMovies