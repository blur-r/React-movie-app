import "../css/Favorite.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/movieCard";
import ShowCard from "../components/showCard";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return (
            <div className="favorites">
                <h2 className="fav">Your Favorites</h2>
                <div className="movie-grid">
                    {favorites.map((item) =>
                        item.title ? (
                            <MovieCard movie={item} key={item.id} />
                        ) : (
                            <ShowCard show={item} key={item.id} />
                        )
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
    );
}

export default Favorites;