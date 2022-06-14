import { SimilarCtx } from "../Context"
import { useContext } from "react"
import { useQuery } from "@apollo/client";
import query from '../scripts/query'
import Card from './Card'

const SimilarMovies = () => {
    const { similarMovies, setSimilarMovies } = useContext(SimilarCtx)
    const { loading, error, data } = useQuery(query.search(similarMovies));
    if (similarMovies) {
    if (loading) return <p className="spinner" title="This is a placeholder.">Loading...</p>;
    if (error) return <p>Error :( {error}</p>;
        console.log(data.searchMovies)

    
        return (
            <div className="movieContainer">
                {/* {data.searchMovies.similar.map((({ id, name, releaseDate, img }) => {
                    <Card key={id} name={name} releaseDate={releaseDate} img={img.url} />
                }))} */}
            </div>
        )
    }
    return

}

export default SimilarMovies