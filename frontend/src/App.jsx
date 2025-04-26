import react from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Liked_Recipes from "./pages/registered_users/Liked_Recipes";
import Saved_Recipes from "./pages/registered_users/Saved_Recipes";
import Menu_Search from "./pages/registered_users/Menu_Search";
import Recipe_Search from "./pages/registered_users/Recipe_Search";
import Recipe from "./pages/registered_users/Recipe";
import Profile from "./pages/registered_users/Profile";
import { UserProvider, useUserContext } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// TODO: make footer component

function Logout() {
    const { setIsAuthorized } = useUserContext();

    localStorage.clear();
    setIsAuthorized(false);

    return <Navigate to="/login/" />;
}

function RegisterAndLogout() {
    localStorage.clear(); // clear out so we dont submit access token to register route
    return <Register />;
}

//Route configuration
function App() {
    return (
        // Give IsAuthorized context to everyone
        <UserProvider>
            <Navbar /> {/* Display Navbar */}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* TODO: change to include query params on route */}
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<RegisterAndLogout />} />
                    <Route path="*" element={<NotFound />} />

                    <Route path="/product" element={<Product />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recipe"
                        element={
                            <ProtectedRoute>
                                <Recipe />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/liked-recipes"
                        element={
                            <ProtectedRoute>
                                <Liked_Recipes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/saved-recipes"
                        element={
                            <ProtectedRoute>
                                <Saved_Recipes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recipe-search"
                        element={
                            <ProtectedRoute>
                                <Recipe_Search />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/menu-search"
                        element={
                            <ProtectedRoute>
                                <Menu_Search />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </UserProvider>
    );
}
export default App;
