import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import { API_URL } from "./Property";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search);
            setIsLoading(false);
        } catch (error) {
            console.log("error", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchMovies("Spiderman");
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
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>
            {isLoading ? (
                <div className="loading">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <>
                    {movie?.length > 0 ? (
                        <div className="container">
                            {movie.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No Movies Found</h2>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default App;
