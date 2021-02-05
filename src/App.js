import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-detail';
import MovieForm from './components/movie-form'
import {useCookies} from 'react-cookie'
import { useFetch } from './hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [token, setToken, removeToken] = useCookies(['mr-token']);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [data, loading, error] = useFetch();
  
  //another way
  useEffect(()=>{
    setMovies(data);
  }, [data])
  //-//

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    })
    .then(data => data.json())
    .then(data => setMovies(data))
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
   if(!token['mr-token']) window.location.href = '/'
}, [token])

  const loadMovie = movie =>{
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null);
  }

  const updatedMovie = movie =>{
    const newMovies = movies.map(mov =>{
      if (mov.id === movie.id){
        return movie
      }
      return mov
    })
    setMovies(newMovies)
  }

  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
   const newMovies = [...movies, movie]
   setMovies(newMovies);
  }
  
  const removeClicked = movie => {
    const newMovies =movies.filter(mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const logoutUser = () =>{
    removeToken(['mr-token']);
  }

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1> Error loading movies</h1>
  return (
    <div className="App">
      <header className="App-header">
        <h1>
        <FontAwesomeIcon icon={faFilm}/>
          <span> Movie rater</span>
          </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="layout">
        <div>
          <MovieList 
          movies={movies} 
          movieClicked={loadMovie} 
          editClicked={editClicked}
          removeClicked={removeClicked}/>
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/> : null}
      </div>
    </div>
  );
}

export default App;
