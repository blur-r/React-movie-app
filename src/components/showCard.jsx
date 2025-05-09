import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

function ShowCard({ show }) {

    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const favorite = isFavorite(show.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(show.id);
        }
        else {
            addToFavorites(show);
        }

    }



    return (
        <div className="movie-card">
            <Link to={`/show/${show.id}`}>
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.title} />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                    </div>
                </div>
            </Link>
            <div className="movie-info">
                <h3>{show.name}</h3>
                <p>{show.first_air_date}</p>
            </div>
        </div>
    );
}

export default ShowCard;