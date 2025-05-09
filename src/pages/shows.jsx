import ShowCard from "../components/showCard";
import { useState, useEffect } from "react";
import { getPopularShows, searchShows } from "../services/api";
import "../css/home.css";





function Shows() {
    const [searchQuery, setSearchQuery] = useState("");
    const [shows, setShows] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularShows = async () => {
            try {
                const popularShows = await getPopularShows();
                setShows(popularShows);
            } catch (err) {
                console.log(err);
                setError("Failed to load shows...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularShows();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true);
        try {
            const searchResults = await searchShows(searchQuery);
            setShows(searchResults)
            setError(null);

        } catch (err) {
            console.log(err);
            setError("Failed to load movies...");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for shows..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? <div className="loading-message">Loading...</div> : <div className="movie-grid">
                {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>}



        </div>
    )

}


export default Shows;