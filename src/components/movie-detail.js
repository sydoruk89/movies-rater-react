import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props){

    const [highlighted, setHighlighted] = useState([-1])

    const highlightRate = high => e => {
        setHighlighted(high);
    }

    const rateClick = rate => e =>{
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token c42969e9f5f9fa48e2c0285ac72137241a9fb32e'
            },
            body: JSON.stringify({stars: rate +1})
        })
        .then(data => data.json())
        .then(() => getDetails())
        .catch(error => console.log(error))
    }

    const getDetails = () =>{
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token c42969e9f5f9fa48e2c0285ac72137241a9fb32e'
            }
        })
        .then(data => data.json())
        .then(data => props.updateMovie(data))
        .catch(error => console.log(error))
    }


    return (
        <>
            {props.movie?(
                <div>
                    <h1>{props.movie.title}</h1>
                    <p>{props.movie.description}</p>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 0? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 1? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 2? 'orange': ''} />
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 3? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 4? 'orange': ''}/>
                    ({props.movie.num_of_ratings})
                    <div className="rate-container">
                        <h2>Rate it</h2>
                        {[...Array(5)].map((e, i)=>{
                            return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i - 1? 'purple': ''} onMouseEnter={highlightRate(i)}
                            onMouseLeave={highlightRate(-1)}
                            onClick={rateClick(i)}/>
                        })}
                    </div>
                </div>
            ): null}
        </>
    )
}

export default MovieDetails