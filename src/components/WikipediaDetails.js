import '../style/movieDetails.css'
import query from "../scripts/query"
import { WikiInfoCtx } from "../Context"
import { useContext, useEffect } from "react"

const WikiDetails = (props) => {
    const { wikiInfo, setWikiInfo } = useContext(WikiInfoCtx)
    if(wikiInfo.showInfo) {
        const wikiMovie = wikiInfo.movieObject
  
        if(wikiMovie.extract?.length) {
            return (
                <div className='movieDetails'>
                    <div className='details-imgContainer'>
                        <img src={wikiMovie.img} alt={wikiMovie.title} />
                    </div>
                    <div className='details-description'>
                        <h1>{wikiMovie.title}</h1>
                        <h3>Description:</h3>
                        <p>{wikiMovie.description}</p>
                        <h3>Story:</h3>
                        <p>{wikiMovie.extract}</p>
                        <span>This page is provided by Wikipedia, the data displayed here might not be relevant to the movie you are looking for. </span>
                        <div className='details-btncontainer'>
                            <a href={wikiMovie.fullurl} target="_blank" rel="noreferrer noopener">More on Wikipedia</a>
                            <a onClick={() => {
                                setWikiInfo(prevState => ({...prevState, showInfo: false, movieObject: {}}))
                            }}>Go Back</a>
                        </div>
        
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>No data found on wikipedia.</h2>
                    <div className='details-description'>
                    <div className='details-btncontainer'>
                            <a onClick={() => {
                                setWikiInfo(prevState => ({...prevState, showInfo: false}))
                            }}>Back to details</a>
                        </div>
                    </div>
                    
                </div>
                
            )
        }
    }
    
}

export default WikiDetails