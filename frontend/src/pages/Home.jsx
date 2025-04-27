// For non-registered users too, Home is where the search functionality for products will be located
import React from "react";
import Search from "../components/Search";
import "../css/Home.css";

function Home() {
    return (
        <header className="hero-section">
            <h1 className="hero-title">
                Search any product and Check its Health.
            </h1>
            <Search />
        </header>
    );
}

export default Home;
