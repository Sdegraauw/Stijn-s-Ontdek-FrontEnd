import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    
    const refresh = async () => {
        const response = await axios.get('/Authorization/refresh', {
            withCredentials: true //allows us to send cookies with our request
        });
        setAuth(prev => { //use previous function (of setAuth?)
            console.log(JSON.stringify(prev)); //prev contains everything off the user (username, pwd, role, accessToken (Login: 49))
            console.log(response.data.accessToken); //contains new refresh token
            return { ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;