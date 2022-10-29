import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=4f4a956e';

const App = () => {
    const [movie, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] =useState([]);
    
    const searchMovies = async (title) => {
        const response = await fetch (`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);
    
    return (
        <div className="app">
            <h1>Netgen</h1>

            <div className="search">
                <input 
                     placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
        </div>
            {
                movie?.length > 0
                    ? (
                        <div className="container">
                            {movie.map((movie) => (
                            <MovieCard movie={movie} />
                            ))}
                        </div>
                        ) : (
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )
            }     
        </div>
    );
}

export default App;