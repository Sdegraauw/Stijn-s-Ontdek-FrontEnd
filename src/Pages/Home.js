import { useState, useRef, useEffect } from "react";
import { api } from "../App";
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import MeetStationLayer from '../Components/MeetStationLayer';
import RegionLayer from "../Components/RegionLayer";
import RadioButtonGroup from '../Components/RadioButtons';
import Checkbox from '../Components/Checkbox'

const BLUR = 50;
const RADIUS = 50;

const gradient_default = {
    0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
    0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
};

const Home = () => {
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [regionData, setRegionData] = useState([]);
    const [latestTempMeasurements, setLatestTempMeasurements] = useState([]);
    
    const [showTemp, setShowTemp] = useState(false)
    const [showDataStations, setShowDataStations] = useState(false);
    const [showRegions, setShowRegions] = useState(true);

    function handleToggleTemp() {
        setShowRegions(false);
        setShowTemp(!showTemp);
    }

    function handleToggleShowDataStations() {
        setShowDataStations(!showDataStations);
    }

    function handleToggleShowRegions() {
        setShowRegions(!showRegions);
        setShowTemp(false);
    }

    function getLatestTempMeasurements() {
        api.get('/measurement/latest').then((response) => {
            setLatestTempMeasurements(response.data);
        })
            .catch(function (error) {
                handleAxiosError(error);
            })
    }

    function getRegionCords() {
        api.get('/neighbourhood/all').then((response) => {
            setRegionData(response.data);
        })
            .catch(function (error) {
                handleAxiosError(error);
            })
    }

    function handleAxiosError(error) {
        setErrMsg('Het ophalen van de gegevens is mislukt');
    }

    useEffect(() => {
        try {
            getLatestTempMeasurements();
            getRegionCords();
        }
        catch (error) {
            // Errors don't reach this catch, check function 'handleAxiosError'
            console.log('error loading data.');
            setErrMsg('Fout bij ophalen kaart-data.');
        }
    }, [])

    return (
        <div className="map-container">
            {
                errMsg && (
                    <div className="error-overlay">
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
                <HeatMapLayer heatmapData={latestTempMeasurements}
                    gradient={gradient_default}
                    visible={showTemp}></HeatMapLayer>
            </Map>

            <div className="legend">
                <RadioButtonGroup
                    handleToggleShowRegions={handleToggleShowRegions}
                    handleToggleTemp={handleToggleTemp}
                />
                <Checkbox handleToggleShowDataStations={handleToggleShowDataStations} />
            </div>

        </div>
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
