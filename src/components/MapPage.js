import { useState, useEffect } from "react";
import axios from '../api/axios';
import {Map, TileLayer, useMap, Popup, Marker, MapLayer} from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';

const AVERAGE_DATA_URL = "/Sensor/average";

const BLUR = 30;
const RADIUS = 30;

const MapPage = () => {

    const [avgData, setAvgData] = useState();
    const [errMsg, setErrMsg] = useState('');

    const [showTemp, setShowTemp] = useState(false)
    const [showStikstof, setShowStikstof] = useState(false)
    const [showKoolstof, setShowKoolstof] = useState(false)
    const [showFijnstof, setShowFijnstof] = useState(false)
    const [showVochtigheid, setShowVochtigheid] = useState(false)
    const [showWindspeed, setShowWindspeed] = useState(false)

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [temperatureData, setTemperatureData] = useState([]);
    const [fijnstofData, setFijnstofData] = useState([]);

    const gradient_default = {
        0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
        0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
      };

      const gradient_fijnstof = {
        0.1: '#6D28ED', 0.2: '#9A07EF', 0.4: '#CD13F2',
        0.6: '#F900E0', 0.8: '#F73D94', '1.0': '#F43430'
      };

      //1=temp, 2= stikstof, 3=koolstofdioxide, 4= fijnstof, 5=luchtvochtigheid, 6=windsnelheid
      function getGradient(typeID){

        if(typeID === 4) return gradient_fijnstof;
        return gradient_default;

      }

    function handleToggleTemp(){
        setShowTemp(!showTemp);
    }

    function handleToggleStikstof(){
        setShowStikstof(!showStikstof);
    }

    function handleToggleKoolstof(){
        setShowKoolstof(!showKoolstof);
    }

    function handleToggleFijnStof(){
        setShowFijnstof(!showFijnstof);
    }

    function handleToggleVochtigheid(){
        setShowVochtigheid(!showVochtigheid);
    }
    
    function handleToggleWindspeed(){
        setShowWindspeed(!showWindspeed);
    }

    function getHeatmapData()
    {
        axios.get('http://localhost:8082/api/Heatmap/'+1).then((response) => setTemperatureData(response.data))
        .catch((error) => console.log(error))

        axios.get('http://localhost:8082/api/Heatmap/'+4).then((response) => setFijnstofData(response.data))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        //used to clean up the async function in the useEffect
        let isMounted = true;
        const controller = new AbortController();

        axios
        .get(`http://localhost:8082/api/Station/Stations`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));

        const getAvgData = async () => {
            try {
                const response = await axios.get(AVERAGE_DATA_URL, {
                    signal: controller.signal
                });
                
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

        getHeatmapData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    
    return (
        <div className="container">
            <div className="row seethroughsection">

                <div className="col-md-9">
                  <Map center={[51.565120, 5.066322]} zoom={13}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {data.map(({ id, latitude, longitude , name}) => (
                          <Marker key = {id} position={[latitude, longitude]}>
                            <Popup>
                              {name}
                            </Popup>
                          </Marker>
                      ))}           

        <HML heatmapData={temperatureData} gradient={getGradient(1)} visible={showTemp}></HML>
        <HML heatmapData={fijnstofData} gradient={getGradient(4)} visible={showFijnstof}></HML>
        

                  </Map>
                </div>

                <div className="col-md-3">
                    <div className="two-thirdpadding">
                        <div className="legend">
                            <h4>Algemene data</h4>
                            {(!errMsg)
                                ? (
                                    <ul>
                                        <li><span></span>Temperatuur: {avgData?.temperature} °C
                                        <input type="checkbox" checked={showTemp} onChange={handleToggleTemp}></input></li>
                                        <li><span></span>Stikstof (N2): {avgData?.nitrogen}
                                        <input type="checkbox" checked={showStikstof} onChange={handleToggleStikstof}></input></li>
                                        <li><span></span>koolstofdioxide (CO2): {avgData?.carbonDioxide}
                                        <input type="checkbox" checked={showKoolstof} onChange={handleToggleKoolstof}></input></li>
                                        <li><span></span>Fijnstof: {avgData?.particulateMatter} µm 
                                        <input type="checkbox" checked={showFijnstof} onChange={handleToggleFijnStof}></input></li>
                                        <li><span></span>Luchtvochtigheid: {avgData?.humidity}%
                                        <input type="checkbox" checked={showVochtigheid} onChange={handleToggleVochtigheid}></input></li>
                                        <li><span></span>Windsnelheid: {avgData?.windSpeed} km/h
                                        <input type="checkbox" checked={showWindspeed} onChange={handleToggleWindspeed}></input></li>
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

const HML = ({heatmapData, gradient, visible}) => {
    if(!visible) return(<></>);

    return (
        <HeatmapLayer
        fitBoundsOnLoad
        points={heatmapData}
        longitudeExtractor={marker => marker.longitude}
        latitudeExtractor={marker => marker.latitude}
        gradient={gradient}
        intensityExtractor={marker => marker.value}
        radius={Number(RADIUS)}
        blur={Number(BLUR)}
        max={Number.parseFloat(0.4)}
      />
    )
   }

export default MapPage
