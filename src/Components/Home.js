import { useState, useRef, useEffect } from "react";
import axios from '../api/axios';
import {Map, TileLayer, useMap, Popup, Marker, Polygon} from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';

const BLUR = 30;
const RADIUS = 30;

//TODO: implement RegionCords en Region uit DB!

  const gradient_default = {
    0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
    0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
  };

  const gradient_fijnstof = {
    0.1: '#6D28ED', 0.2: '#9A07EF', 0.4: '#CD13F2',
    0.6: '#F900E0', 0.8: '#F73D94', '1.0': '#F43430'
  };

  function getGradient(typeID){
    if(typeID === 4) return gradient_fijnstof;
    return gradient_default;
}

const colors = {
    1: "red", 2: "green", 3: "blue", 4: "purple", 5: "cyan", 6: "brown", 7: "gray", 8: "pink", 9: "yellow"
}

function getRegionColor(regionId){
    if(regionId <= 9) return colors[regionId];
    else return regionId[1];
}

const Home = () => {

    const [avgData, setAvgData] = useState();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [showTemp, setShowTemp] = useState(false)
    const [showStikstof, setShowStikstof] = useState(false)
    const [showKoolstof, setShowKoolstof] = useState(false)
    const [showFijnstof, setShowFijnstof] = useState(false)
    const [showVochtigheid, setShowVochtigheid] = useState(false)
    const [showWindspeed, setShowWindspeed] = useState(false)

    const [data, setData] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [fijnstofData, setFijnstofData] = useState([]);
    const [regionData, setRegionData] = useState([]);

    const [showDataStations, setShowDataStations] = useState(true);
    const [showRegions, setShowRegions] = useState(true);

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

    function handleToggleShowDataStations(){
        setShowDataStations(!showDataStations);
    }

    function handleToggleShowRegions(){
        setShowRegions(!showRegions);
    }

    function getHeatmapData()
    {
        axios.get('http://localhost:8082/api/Heatmap/'+1).then((response) => setTemperatureData(response.data))
        .catch((error) => console.log(error))

        axios.get('http://localhost:8082/api/Heatmap/'+4).then((response) => setFijnstofData(response.data))
        .catch((error) => console.log(error))
    }

    function getStationsData()
    {
        axios.get(`http://localhost:8082/api/Station/Stations`).then((response) => {setData(response.data); console.log(response.data);})
        .catch((error) => console.log(error))
    }

    function getAverageData()
    {
        axios.get('http://localhost:8082/api/Sensor/average').then((response) => setAvgData(response.data))
        .catch((error) => console.log(error))
    }

    function getRegionCords()
    {
        axios.get('http://localhost:8082/api/Region/regioninfo').then((response) => {setRegionData(response.data); console.log(response.data);})
        .catch((error) => console.log(error))
    }

    useEffect(() => {

        try
        {
            getStationsData();
            getAverageData();
            getHeatmapData();
            getRegionCords();
        }
        catch(error)
        {
            console.log('error loading data.');
            setErrMsg('Fout bij ophalen kaart-data.');
        }

    }, [])

    return (
        <div className="container">

            <label>Toon meetstations: </label>
            <input type="checkbox" checked={showDataStations} onChange={handleToggleShowDataStations}></input> <br></br>

            <label>Toon regio's: </label>
            <input type="checkbox" checked={showRegions} onChange={handleToggleShowRegions}></input>

            <div className="row seethroughsection">

                <div className="col-md-9">
                  <Map center={[51.565120, 5.066322]} zoom={13}> 

                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 


                    <RegionLayer data={regionData} visible={showRegions} _opacity={0}></RegionLayer>
                    <MeetStationLayer data={data} visible={showDataStations}></MeetStationLayer>
                    <HeatMapLayer heatmapData={temperatureData} gradient={getGradient(1)} visible={showTemp}></HeatMapLayer>
                    <HeatMapLayer heatmapData={fijnstofData} gradient={getGradient(4)} visible={showFijnstof}></HeatMapLayer>
        

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
            <div className="form-check">
              <label for="showRegions">Regio's</label>
              <input className="form-check-input" type="checkbox" id="showRegions" checked={showRegions} onChange={handleToggleShowRegions}></input>
            </div>
            <div className="form-check">
              <label for="showTemp">Temperatuur</label>
              <input className="form-check-input" type="checkbox" id="showTemp" checked={showTemp} onChange={handleToggleTemp}></input>
            </div>
            <div className="form-check">
              <label for="showParticulateMatter">Fijnstof</label>
              <input className="form-check-input" type="checkbox" id="showParticulateMatter" checked={showFijnstof} onChange={handleToggleFijnStof}></input>
            </div>
          </div>
        </div>
    )
}

const RegionLayer = ({data, visible}) =>{
    if(!visible) return (<></>);

     return (
        <>
        {data.map(({ region, cordsList, averageData}) =>(
            <Polygon positions={cordsList} key={region.id} color={getRegionColor(region.id)} opacity={0.25} fillOpacity={0.2}>
                <Popup>
                    <label className="bold">Algemene data {region.name}</label> <br/>

                    {averageData.map(({id, name, data}) =>(
                    <div key = {id}>
                        <label>
                            {name}: {data} {getDataTypeSuffix(id)}
                        </label>
                    </div>
                    
                ))}
                </Popup>
         </Polygon>
        ))}
        </>)

   }


const HeatMapLayer = ({heatmapData, gradient, visible}) => {
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

   const MeetStationLayer = ({data, visible}) =>{
        if(!visible) return (<></>);

        return(
            <>
             {data.map(({ id, latitude, longitude , name, sensors}) => (
            <Marker key = {id} position={[latitude, longitude]}>
              <Popup>
                <label className="bold">{name}</label>

                {sensors.map(({id, typeId, data}) =>(
                    <div key = {id}>
                        <label>
                            {getDataType(typeId)}: {data} {getDataTypeSuffix(typeId)}
                        </label>
                    </div>
                    
                ))}
              </Popup>
            </Marker>
        ))}      
            </>
        )         
   }
   

   function getDataTypeSuffix(typeId){
    switch(typeId){
        case 1:
            return "°C";
        case 2:
            return "";
        case 3:
            return "";
        case 4:
            return "µm ";
        case 5:
            return "%";
        case 6:
            return "km/h";
        default:
            return "Onbekend.";
    }
   }

   function getDataType(typeId){
    switch(typeId){
        case 1:
            return "Temperatuur";
        case 2:
            return "Stikstof (N2)";
        case 3:
            return "koolstofdioxide (CO2)";
        case 4:
            return "Fijnstof";
        case 5:
            return "Luchtvochtigheid";
        case 6:
            return "Windsnelheid";
        default:
            return "Onbekend.";
    }
   }

export default Home
