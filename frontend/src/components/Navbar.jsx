import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

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
                <div className="header-logo">
                    {/* Left Side of Navbar */}
                    {/* Acts like normal hyperlink except for something on own webpage */}
                    <Link to="/">Health Checker</Link>
                </div>
                <ul className="header-links">
                    <li>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    {/* Conditional Rendering */}
                    {isAuthorized === null || isAuthorized === false ? (
                        <>
                            {/* React requires that a component or expression only return a single parent element. */}
                            <li>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/profile" className="nav-link">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/recipe-search" className="nav-link">
                                    Search Recipes
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu-search" className="nav-link">
                                    Search Menus
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" className="nav-link">
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
