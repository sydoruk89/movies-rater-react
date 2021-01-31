import React, {useState, useEffect} from 'react';
import {API} from '../api-service'

function MovieForm(props){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setTitle(props.movie.title)
        setDescription(props.movie.description)
    }, [props.movie])

    const updateClicked = () => {
        API.updateMovie(props.movie.id, {title, description})
        .then(resp => props.updatedMovie(resp))
        .catch(error => console.log(error))
    }

    const createClicked = () => {
        API.createMovie({title, description})
        .then(resp => props.movieCreated(resp))
        .catch(error => console.log(error))
    }

    return (
        <>
            {props.movie ? (
                <div>
                    <label htmlFor="title">Title</label><br/>
                    <input id="title" type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)}></input><br/>
                    <label htmlFor="description">Description</label><br/>
                    <textarea id="description" type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea><br/>
                    { props.movie.id ?
                        <button onClick={updateClicked}>Update</button> :
                        <button onClick={createClicked}>Create</button>
                    }
                    
                </div>
             ) : null}
            
        </>
    )
}

export default MovieForm