import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({}); //empty out current user
        try {
            const response = await axios('/Authorization/logout', {
                withCredentials: true //necessary, with this line, it makes it possible to send secure cookie back
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout