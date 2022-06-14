import '../style/Searchbar.css'
import React, { useContext } from 'react'
import { HeadingCtx, MoviesCtx, WikiInfoCtx, SearchBarCtx } from '../Context'

const SearchBar = () => {
    /* let searchTimeout; */
    const { setHeading } = useContext(HeadingCtx)
    const { setMovies } = useContext(MoviesCtx)
    const { setWikiInfo } = useContext(WikiInfoCtx)
    const { searchBar, setSearchBar } = useContext(SearchBarCtx)
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
                        setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
                        setHeading(prevState => ({ ...prevState, mainHeading: `Search results for ${e.target.value}:` }))
                        setMovies(prevState => ({ ...prevState, search: e.target.value }))
                    } else {
                        setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
                        setHeading(prevState => ({ ...prevState, mainHeading: "Now Trending" }))
                        setMovies(prevState => ({ ...prevState, search: false }))
                    }
                }
            }} onChange={(e) => {
                setSearchBar(e.target.value)
                if (e.target.value.length < 1) {
                    setHeading(prevState => ({ ...prevState, mainHeading: "Now Trending" }))
                    setMovies(prevState => ({ ...prevState, filter: "trending", search: false, movieTitle: false }))
                    setWikiInfo(prevState => ({ ...prevState, showInfo: false }))
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