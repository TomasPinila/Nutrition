import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

function Navbar() {
    const { isAuthorized } = useUserContext(); // Grab UserContext values by using useUserContext hook
    // Optional: Handle loading state
    if (isAuthorized === null) {
        return null; // or a loading spinner
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {/* Left Side of Navbar */}
                {/* Acts like normal hyperlink except for something on own webpage */}
                <Link to="/">Food Check</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                {/* Conditional Rendering */}
                {isAuthorized === null || isAuthorized === false ? (
                    <>
                        {/* React requires that a component or expression only return a single parent element. */}
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        <Link to="/register" className="nav-link">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                        <Link to="/recipe-search" className="nav-link">
                            Search Recipes
                        </Link>
                        <Link to="/menu-search" className="nav-link">
                            Search Menus
                        </Link>
                        <Link to="/logout" className="nav-link">
                            Log out
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
