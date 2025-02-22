// From React with ONE.. vid, go to contexts
import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);
// // We'll wrap the entire app around this context, so that whole app has access to the state
export const UserProvider = ({ children }) => {
    // defined Children is a reserved prop when you write a component and children is anything that's inside of the component that you rendered, meaning anything wrapped inside

    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)); // Catch if errors
    }, []);

    // refresh access token automatically
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const res = await api.post("/api/token/refresh", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false); // if refresh token is expired for example or other error
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    // check if we need to refresh token
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token); // automatically decode token: access to value and expiration date
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // get date in seconds

        if (tokenExpiration < now) {
            // if expired
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    const value = { isAuthorized, setIsAuthorized }; // Specify all values to provide to children

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
