import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowDetails } from "../services/api";
import "../css/movie-detail.css";



function ShowDetails() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchShow() {
            try {
                const showData = await getShowDetails(id);
                setShow(showData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchShow();
    }, [id]);

    if (loading) return <p>Loading show details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!show) return null;

    return (
        <div className="movie-detail">
            <div
                className="movie-backdrop"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${show.backdrop_path})`,
                }}
            ></div>

            <div className="movie-content">
                <h1>{show.name}</h1>
                <div className="flex">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={show.name}
                    />
                    <div>
                        <p><strong>First Air Date:</strong> {show.first_air_date}</p>
                        <p><strong>Rating:</strong> {show.vote_average}</p>
                        <p><strong>Overview:</strong> {show.overview}</p>
                        <p>
                            <strong>Genres:</strong> {show.genres.map((g) => g.name).join(", ")}
                        </p>
                        <p>
                            <strong>Episode Runtime:</strong> {show.episode_run_time[0]} minutes
                        </p>
                        <p>
                            <strong>Language:</strong> {show.original_language.toUpperCase()}
                        </p>
                        <p>
                            <strong>Status:</strong> {show.status}
                        </p>
                        <p>
                            <strong>Number of Seasons:</strong> {show.number_of_seasons}
                        </p>
                        <p>
                            <strong>Number of Episodes:</strong> {show.number_of_episodes}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default ShowDetails;