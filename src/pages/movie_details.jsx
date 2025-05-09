import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/movie-detail.css";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("Movie ID:", id);
        async function fetchMovie() {
            try {
                const popularMovies = await getMovieDetails(id);
                setMovie(popularMovies);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovie();
    }, [id]);

    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!movie) return null;

    return (
        <div className="movie-detail">
            <div
                className="movie-backdrop"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})` }}
            ></div>

            <div className="movie-content">
                <h1>{movie.title}</h1>
                <div className="flex">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                        <p><strong>Overview:</strong> {movie.overview}</p>
                        <p>
                            <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
                        </p>
                        <p>
                            <strong>Runtime:</strong> {movie.runtime} minutes
                        </p>
                        <p>
                            <strong>Language:</strong> {movie.original_language.toUpperCase()}
                        </p>
                        <p>
                            <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                        </p>
                        <p>
                            <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                        </p>
                        <p>
                            <strong>Status:</strong> {movie.status}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
