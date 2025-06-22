import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom"; // For query params
import "../css/Search.css";

function Search({ variant = "default" }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const className =
        variant === "home" ? "search search-home" : "search search-compact";

    const handleSubmit = (e) => {
        e.preventDefault();

        // Navigate to the SearchResults page with the search query as a query parameter.
        // This builds a query string like: ?query=yourSearchTerm
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({ query: searchQuery })}`,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={className}>
                <input
                    type="text"
                    placeholder="Search For a Product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" disabled={!searchQuery.trim()}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    );
}

export default Search;
