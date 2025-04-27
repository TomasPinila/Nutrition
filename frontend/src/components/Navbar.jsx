import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import "../css/Navbar.css";

//TODO: Add search component in navbar like google/amazon, google icon on left, search bar centered, and links to the right

function Navbar({ search }) {
    const { isAuthorized } = useUserContext(); // Grab UserContext values by using useUserContext hook
    // Optional: Handle loading state
    if (isAuthorized === null) {
        return null; // or a loading spinner
    }

    return (
        <header className="header">
            <nav className="header-nav">
                {/* Left Side of Navbar */}
                {/* Acts like normal hyperlink except for something on own webpage */}
                <Link to="/" className="header-logo">
                    Health Checker
                </Link>

                <ul className="header-links">
                    <li>
                        <Link to="/" className="header-link">
                            Home
                        </Link>
                    </li>
                    {/* Conditional Rendering */}
                    {isAuthorized === null || isAuthorized === false ? (
                        <>
                            {/* React requires that a component or expression only return a single parent element. */}
                            <li>
                                <Link to="/login" className="header-link">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="header-link">
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/profile" className="header-link">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/recipe-search"
                                    className="header-link"
                                >
                                    Search Recipes
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu-search" className="header-link">
                                    Search Menus
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" className="header-link">
                                    Log out
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
