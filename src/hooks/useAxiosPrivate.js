//hook to attach the interceptors to axios instance
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) { //if true, then its the first attempt
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`; //initial/old access token
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, //if response is good, return response otherwise async (expired access token)
            async (error) => { //when access token is expired
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) { //403 = forbidden: expired access token
                    prevRequest.sent = true; //makes sure it only sends ones
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; //put new access token in authorization header
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            } 
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;