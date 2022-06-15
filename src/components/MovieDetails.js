import '../style/movieDetails.css'
import Spinner from './Spinner'
import { HeadingCtx, MoviesCtx, WikiInfoCtx, IMDbInfoCtx, SimilarCtx } from '../Context'
import { useContext } from 'react'
import query from '../scripts/query'
const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"

const MovieDetails = (props) => {
    const { wikiInfo, setWikiInfo } = useContext(WikiInfoCtx)
    const { imdbInfo, setImdbInfo } = useContext(IMDbInfoCtx)
    const { setHeading } = useContext(HeadingCtx)
    const { movies, setMovies } = useContext(MoviesCtx)
    const { setSimilarMovies } = useContext(SimilarCtx)
    const movie = props.data

    if (movie) {
        if (!wikiInfo.showInfo) {
            return (
                <div className='movieDetails'>
                    <div className='details-imgContainer'>
                        <img src={movie.img ? movie.img.url : noImage} alt={movie.name} />

                    </div>
                    <div className='details-description'>
                        <h1>{movie.name}</h1>
                        <h2>Overview: </h2>
                        <p>{movie.overview}</p>
                        <h3>Rating: {movie.score.toFixed(1)} </h3>
                        <div className='details-btncontainer'>
                            {!movies.storedRelated ? <a onClick={async () => {
                                setSimilarMovies(prevState => ({ ...prevState, showSimilar: true, searchTerm: movie.name, storedMovie: movie }))
                                setMovies(prevState => ({...prevState, storedRelated: movies.selected, selected: "", }))
                            }}>
                                Related movies
                            </a> : null}
                            <a onClick={() => {
                                setWikiInfo(prevState => ({ ...prevState, isLoading: true }))
                                fetch(query.wikipedia.getPageId(movie.name))
                                    .then(response => response.json())
                                    .then(json => {
                                        const pageId = json.query.search[0].pageid
                                        fetch(query.wikipedia.getExtract(pageId))
                                            .then(response => response.json())
                                            .then(json => {
                                                setWikiInfo(prevState => ({ ...prevState, isLoading: false }))
                                                const wikiResponseObject = json.query.pages[Object.keys(json.query.pages)[0]]
                                                const newObject = { ...wikiResponseObject, img: movie.img ? movie.img.url : noImage }
                                                setWikiInfo(prevState => ({ ...prevState, showInfo: true, movieObject: newObject }))
                                            })
                                    })
                                    .catch(() => {
                                        setWikiInfo(prevState => ({ ...prevState, isLoading: false }))
                                        return alert("Error while getting Wiki info. Please try again later.")
                                    })
                            }}>
                                {wikiInfo.isLoading ? <Spinner /> : "Wikipedia"}
                            </a>
                            <a title="Link opens in a new window, you'll need to enable Pop-Ups." onClick={() => {
                                setImdbInfo(prevState => ({ ...prevState, isLoading: true }))
                                fetch(query.imdb.getPageId(movie.name))
                                    .then(response => response.json())
                                    .then(json => {
                                        const id = json.results[0].id
                                        setImdbInfo(prevState => ({ ...prevState, isLoading: false }))
                                        window.open(`https://www.imdb.com/title/${id}`)
                                    })
                                    .catch(() => {
                                        setImdbInfo(prevState => ({ ...prevState, isLoading: false }))
                                        return alert("Error while getting IMDb link. Please try again later.")
                                    })
                            }}>
                                {imdbInfo.isLoading ? <Spinner /> : "IMDb page"}
                            </a>
                            <a onClick={() => {
                                setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
                                setHeading(prevState => ({ ...prevState, mainHeading: "Now Trending" }))
                                setMovies(prevState => ({ ...prevState, selected: "" }))
                            }}>
                                Back
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
    }




}




export default MovieDetails