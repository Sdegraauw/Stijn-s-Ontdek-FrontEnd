import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../api/axios';


const url = '/Authentication/verify';

const Verify = () => {
    const { linkHash, email } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(url , { params : {linkHash, email} });
                console.log(response);
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        };
        getData();  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return (
        <div>
            <p>{error}</p>
            <p>linkHash: {linkHash}</p>
            <br/>
            <p>email: {email}</p>
            <br/>
            <p>back end link: http://localhost:8080/api/Authentication/verify?linkHash={linkHash}&email={email}</p>
        </div>
    );
}
 
export default Verify;