import { useContext } from "react"
import { SimilarCtx, WikiInfoCtx, HeadingCtx, MoviesCtx } from "../Context"

const BackToHomeBtn = () => {
    const { similarMovies, setSimilarMovies } = useContext(SimilarCtx)
    const { setWikiInfo } = useContext(WikiInfoCtx)
    const { setHeading } = useContext(HeadingCtx)
    const { movies, setMovies } = useContext(MoviesCtx)
    return (
        <a className="backHomeBtn" onClick={() => {
            setSimilarMovies(prevState => ({ ...prevState, showSimilar: false }))
            setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
            setHeading(prevState => ({ ...prevState, mainHeading: "Now Trending" }))
            setMovies(prevState => ({ ...prevState, search: false, storedRelated: false, selected: "", movieObject: similarMovies.movies ? similarMovies.movies : movies.movieObject }))

        }}>Back to Home Page</a>
    )
}

export default BackToHomeBtn