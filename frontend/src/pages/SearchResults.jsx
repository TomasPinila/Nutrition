import React, { useEffect, useState } from "react";
import api from "../api";
import { useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import LoadingIndicator from "../components/LoadingIndicator";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import "../css/SearchResults.css";

function SearchResults() {
    // Pagination setup
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSetPage, setCurrentSetPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    //Store errors if they've ocurred
    const [error, setError] = useState(null);
    //Store loading state (if we're loading data)
    const [loading, setLoading] = useState(true); //true because as soon as we load component we make API call

    const loadSearchResults = async () => {
        try {
            const product_results = await api.get("api/product_search/", {
                params: {
                    query: query.trim(), // axios automatically serializes this into the query string
                    page_number: currentPage,
                },
            });
            const data = product_results.data;

            // Pagination setup
            currentPage != data.current_page &&
                setCurrentPage(data.current_page);
            currentSetPage != data.current_set_page &&
                setCurrentSetPage(data.current_set_page);
            totalPages != data.total_pages && setTotalPages(data.total_pages);

            setSearchResults(data.products);
        } catch (error) {
            console.log(error);
            setError("Failed to load products...");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // If query is not provided, update error state and stop further processing.
        if (!query) {
            setError("Provide a Product Name to search");
            setLoading(false);
            return;
        }
        setLoading(true);
        loadSearchResults();
    }, [query]);

    useEffect(() => {
        setLoading(true);
        loadSearchResults();
    }, [currentPage]);

    return (
        <>
            <section className="container top-section">
                <h2 className="top-title">Search Results</h2>
                <div className="top-search">
                    <Search variant="search_results" />
                </div>
            </section>
            <section className="container">
                {loading ? (
                    <div className="load-container">
                        <LoadingIndicator />
                    </div>
                ) : error ? (
                    <Error error={error} />
                ) : (
                    <>
                        <div className="products-grid">
                            {searchResults.map((product) => (
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                />
                            ))}
                        </div>
                    </>
                )}
                <Pagination
                    current_page={currentPage}
                    current_set_page={currentSetPage}
                    total_pages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </section>
        </>
    );
}

export default SearchResults;
