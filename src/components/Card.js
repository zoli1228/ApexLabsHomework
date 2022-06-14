import React, { useContext } from "react"
import { MoviesCtx } from "../Context";
import '../style/card.css'

const solveGenres = (genres) => {
    let result = "";
    if(genres.length) {
        genres.forEach(elem => {
            result += elem.name + ", "
        })
        result = result.slice(0, result.length -2)
        return result
    }
    return
}

const SolveRating = (props) => {
    const score = props.score
    if(score) {
        return (
            <div>
                Rating: 
                <span style={{color: `rgb(${255 - (score * 20)}, ${25 * score}, 50)`}}> {score.toFixed(1)}</span>

            </div>
        )
    }
}

const Card = (props) => {
    const {setMovies} = useContext(MoviesCtx)
    const id = props.id

    return (
        <div className="card" onClick={(e) => {
            setMovies(prevState => ({ ...prevState, selected: id }))
          }}  >
            <div className="imgContainer">
                <img src={props.img} alt={props.name + " poster image"}></img>
            </div>
            <p>{props.name}</p>
            <span>{solveGenres(props.genres)}</span>
            <SolveRating score={props.score} />
        </div>
    )

}

export default Card;