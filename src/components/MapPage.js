import { useState, useEffect } from "react";
import axios from '../api/axios';

const AVERAGE_DATA_URL = "/Sensor/average";

const MapPage = () => {

    const [avgData, setAvgData] = useState();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        //used to clean up the async function in the useEffect
        let isMounted = true;
        const controller = new AbortController();

        const getAvgData = async () => {
            try {
                const response = await axios.get(AVERAGE_DATA_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setAvgData(response.data); 
                // const count = Object.keys(response.data).length;
                // console.log(count);
                if (response.data.length === 0) {
                    setErrMsg('Geen algemene data gevonden');
                }
            } catch (err) {
                setErrMsg('Server timeout');
                console.error(err);
            }
        }

        getAvgData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return (
        <div className="container">
            <div className="row seethroughsection">

                <div className="col-md-9">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget dignissim quam. Aliquam erat volutpat.
                        Cras quam eros, scelerisque congue erat sit amet, fringilla ornare ante. Sed sagittis dui tortor. Duis vitae
                        nisi euismod, interdum quam id, posuere diam. Cras enim dui, pharetra eu tellus eu, scelerisque mollis nibh.
                        Etiam in ligula arcu. Fusce luctus dignissim nibh, et fringilla nisl consequat quis. Aenean porta hendrerit vulputate.
                        Duis consectetur tempus arcu ac consectetur. Fusce euismod odio id tempus rutrum. Suspendisse potenti.</p>
                </div>

                <div className="col-md-3">
                    <div className="two-thirdpadding">
                        <div className="legend">
                            <h4>Algemene data</h4>
                            {(!errMsg)
                                ? (
                                    <ul>
                                        <li><span></span>Temperatuur: {avgData?.temperature} °C</li>
                                        <li><span></span>Stikstof (N2): {avgData?.nitrogen}</li>
                                        <li><span></span>koolstofdioxide (CO2): {avgData?.carbonDioxide}</li>
                                        <li><span></span>Fijnstof: {avgData?.particulateMatter} µm</li>
                                        <li><span></span>Luchtvochtigheid: {avgData?.humidity}%</li>
                                        <li><span></span>Windsnelheid: {avgData?.windSpeed} km/h</li>
                                    </ul>
                                ) : <p>{errMsg}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapPage