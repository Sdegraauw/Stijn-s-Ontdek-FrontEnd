import { useState, useRef, useEffect } from "react";
import { api } from "../App";
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from '../Components/HeatmapLayer';
import RadioButtonGroup from '../Components/RadioButtons';
import MeetStationLayer from '../Components/MeetStationLayer';
import RegionLayer from "../Components/RegionLayer";

function GiveLanguage() {
    const Language = "Nederlands"
    return Language;
}

function GivePageId() {
    const PageId = "Home"
    return PageId;
}

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

function getGradient(typeID) {
    if (typeID === 4) return gradient_fijnstof;
    return gradient_default;
}

const Home = () => {

    const [avgData, setAvgData] = useState();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [showSettings, setShowSettings] = useState(false)
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

    const [showDataStations, setShowDataStations] = useState(false);
    const [showRegions, setShowRegions] = useState(true);

    const [latestTempMeasurements, setLatestTempMeasurements] = useState([]);

    function handleToggleTemp() {
        setShowRegions(false);
        setShowTemp(!showTemp);
        setShowFijnstof(false);

        setShowDataStations(false);
    }

    function handleToggleStikstof() {
        setShowStikstof(!showStikstof);
    }

    function handleToggleKoolstof() {
        setShowKoolstof(!showKoolstof);
    }

    function handleToggleFijnStof() {
        setShowRegions(false);
        setShowTemp(false);
        setShowFijnstof(!showFijnstof);

        setShowDataStations(true)
    }

    function handleToggleVochtigheid() {
        setShowVochtigheid(!showVochtigheid);
    }

    function handleToggleWindspeed() {
        setShowWindspeed(!showWindspeed);
    }

    function handleToggleShowDataStations() {
        setShowDataStations(!showDataStations);
    }

    function handleToggleShowRegions() {
        setShowRegions(!showRegions);
        setShowTemp(false);
        setShowFijnstof(false);

        setShowDataStations(false);
    }

    function getHeatmapData()
    {
        api.get('/Heatmap/' + 1).then((response) => setTemperatureData(response.data))
        .catch(function (error) {
            handleAxiosError(error);
        })

        api.get('/Heatmap/' + 4).then(function (response) {
            setFijnstofData(response.data)
        })
            .catch(function (error) {
                handleAxiosError(error);
            })
    }

    function getLatestTempMeasurements() {
        api.get('/measurement/latest').then((response) => {
            setLatestTempMeasurements(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            handleAxiosError(error);
        })
    }

    function getStationsData()
    {
        api.get(`/Station/Stations`).then((response) => {
            setData(response.data); 
            console.log(response.data);
        })
        .catch(function (error) {
            handleAxiosError(error);
        })
    }

    function getAverageData()
    {
        api.get('/Sensor/average').then((response) => setAvgData(response.data))
        .catch(function (error) {
            handleAxiosError(error);
        })
    }

    function getRegionCords()
    {
        api.get('/Region/regioninfo').then((response) => {
            setRegionData(response.data);
            // Since this is the last called get request, enable settings when successfull
            setShowSettings(true);
            console.log(response.data);
        })
            .catch(function (error) {
                handleAxiosError(error);
            })

    }

    function handleAxiosError(error) {
        console.log(error);
        setErrMsg('Het ophalen van de gegevens is mislukt');
    }

    useEffect(() => {
        try {
            getLatestTempMeasurements();
            getStationsData();
            getAverageData();
            getHeatmapData();
            getRegionCords();
        }
        catch (error) {
            // Errors don't reach this catch, check function 'handleAxiosError'
            console.log('error loading data.');
            setErrMsg('Fout bij ophalen kaart-data.');
        }
    }, [])

    return (
        <section className="home-section">
            <div className="map-container">
                {
                    errMsg && (
                        <div className="errorOverlay">
                            <p ref={errRef} aria-live="assertive">{errMsg}</p>
                            <button className="button" onClick={() => window.location.reload(false)}>Opnieuw proberen</button>
                        </div>
                    )
                }
                <Map center={[51.565120, 5.066322]} zoom={13}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <RegionLayer data={regionData} visible={showRegions}></RegionLayer>
                    <MeetStationLayer data={latestTempMeasurements} visible={showDataStations}></MeetStationLayer>
                    {/* <HeatMapLayer heatmapData={temperatureData}
                                  gradient={getGradient(1)}
                                  visible={showTemp}></HeatMapLayer>
                    <HeatMapLayer heatmapData={fijnstofData}
                                  gradient={getGradient(4)}
                                  visible={showFijnstof}></HeatMapLayer> */}
                    <HeatMapLayer heatmapData={latestTempMeasurements}
                                  gradient={getGradient(1)}
                                  visible={showTemp}></HeatMapLayer>
                </Map>
            </div>
            <RadioButtonGroup handleToggleShowRegions={handleToggleShowRegions} 
                              handleToggleTemp={handleToggleTemp} 
                              handleToggleFijnStof={handleToggleFijnStof} />
        </section>
    )
}

const HeatMapLayer = ({ heatmapData, gradient, visible }) => {
    if (!visible) return (<></>);

    return (
        <HeatmapLayer
            fitBoundsOnLoad={false}
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

export default Home
