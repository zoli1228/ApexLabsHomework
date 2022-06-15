import React, { useState, createContext } from "react";
import SearchBar from "./components/SearchBar";


export const HeadingCtx = createContext({});
export const SubHeadingCtx = createContext("");
export const MoviesCtx = createContext({});
export const SimilarCtx = createContext({});
export const WikiInfoCtx = createContext({});
export const IMDbInfoCtx = createContext({});
export const SearchBarCtx = createContext("");


export const SearchBarProvider = ({ children }) => {
    const [searchBar, setSearchBar ] = useState("");
    return (
        <SearchBarCtx.Provider value={{ searchBar, setSearchBar  }}>
            {children}
        </SearchBarCtx.Provider>
    );
};

export const WikiInfoProvider = ({ children }) => {
    const [wikiInfo, setWikiInfo] = useState({
        isLoading: false,
        showInfo: false,
        movieObject: {}
    });
    return (
        <WikiInfoCtx.Provider value={{ wikiInfo, setWikiInfo }}>
            {children}
        </WikiInfoCtx.Provider>
    );
};

export const IMDbProvider = ({ children }) => {
    const [imdbInfo, setImdbInfo] = useState({
        isLoading: false,
        showInfo: false,
        movieObject: {}
    });
    return (
        <IMDbInfoCtx.Provider value={{ imdbInfo, setImdbInfo }}>
            {children}
        </IMDbInfoCtx.Provider>
    );
};

export const HeadingProvider = ({ children }) => {
    const [heading, setHeading] = useState({mainHeading: "Trending Now"});
    return (
        <HeadingCtx.Provider value={{ heading, setHeading }}>
            {children}
        </HeadingCtx.Provider>
    );
};

export const SubHeadingProvider = ({ children }) => {
    const [subHeading, setSubHeading] = useState("");
    return (
        <SubHeadingCtx.Provider value={{ subHeading, setSubHeading }}>
            {children}
        </SubHeadingCtx.Provider>
    );
};

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState({
        filter: "trending", 
        search: false, 
        listCount: 20,
        movieObject: {},
        selected: "",
        storedRelated: false
    });
    return (
        <MoviesCtx.Provider value={{ movies, setMovies }}>
            {children}
        </MoviesCtx.Provider>
    );
}

export const SimilarProvider = ({ children }) => {
    const [similarMovies, setSimilarMovies] = useState({
        storedMovie: {},
        showSimilar: false,
        searchTerm: "",
        foundSimilar: false,
        movies: null
    });
    return (
        <SimilarCtx.Provider value={{ similarMovies, setSimilarMovies }}>
            {children}
        </SimilarCtx.Provider>
    );
}
