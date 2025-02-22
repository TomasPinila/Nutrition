// Wrapper for protected route, we need auth token before we're able to access route. Kind of like a context
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

function ProtectedRoute({ children }) {
    // children is what'll be wrapped. Children is a reserved prop when you write a component and children is anything that's inside of the component that you rendered, meaning anything wrapped inside.

    const { isAuthorized } = useUserContext(); // Grab UserContext values by using useUserContext hook

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login/" />;
}

export default ProtectedRoute;
