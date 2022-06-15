import '../style/Searchbar.css'
import React, { useContext } from 'react'
import { HeadingCtx, MoviesCtx, WikiInfoCtx, SearchBarCtx, SimilarCtx } from '../Context'


const SearchBar = () => {

    /* let searchTimeout; */
    const { setHeading } = useContext(HeadingCtx)
    const { movies, setMovies } = useContext(MoviesCtx)
    const { setWikiInfo } = useContext(WikiInfoCtx)
    const { similarMovies, setSimilarMovies } = useContext(SimilarCtx)
    const { searchBar, setSearchBar } = useContext(SearchBarCtx)

    const resetSearch = () => {
        setSimilarMovies(prevState => ({ ...prevState, showSimilar: false }))
        setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
        setHeading(prevState => ({ ...prevState, mainHeading: "Now Trending" }))
        setMovies(prevState => ({ ...prevState, search: false, storedRelated: false, selected: "", movieObject: similarMovies.movies ? similarMovies.movies : movies.movieObject }))
    }

    return (
        <div className='searchBar'>
            {searchBar ? <button className='clearSearchBtn' onClick={(e) => {
                e.target.parentElement.querySelector("input").value = "";
                setSearchBar("")
                setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
                setHeading(prevState => ({ ...prevState, mainHeading: "Now Trending" }))
                setMovies(prevState => ({ ...prevState, search: false }))
            }}>Clear search</button> : null}

            <input type="search" className="Search" placeholder='Search' onKeyDown={(e) => {
                if (e.keyCode === 13 || e.key === "Enter") {
                    if (e.target.value) {
                        setSimilarMovies(prevState => ({ ...prevState, showSimilar: false }))
                        setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
                        setHeading(prevState => ({ ...prevState, mainHeading: `Search results for ${e.target.value}:` }))
                        setMovies(prevState => ({ ...prevState, search: e.target.value, storedRelated: false, selected: "" }))
                    } else {
                        resetSearch()
                    }
                }
            }} onChange={(e) => {
                setSearchBar(e.target.value)
                if (e.target.value.length < 1) {
                    resetSearch()
                }
            }}
            /* //OPTIONAL: Search while typing with a delay to avoid query spamming 
            clearTimeout(searchTimeout)
            if (e.target.value) {
                searchTimeout = setTimeout(() => {
                    setHeading(solveHeading(e.target.value))
                    setMovies(solveMovies(e.target.value))
                }, 500)
            } else {
                setHeading(solveHeading(e.target.value))
                setMovies(solveMovies(e.target.value))
            }

         */></input >
        </div>
    )
}

export default SearchBar