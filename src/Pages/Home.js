import { useState, useRef, useEffect } from "react";
import { api } from "../App";
import { FeatureGroup, LayerGroup, LayersControl, MapContainer, TileLayer, useMap } from 'react-leaflet';
import MeetStationLayer from '../Components/MeetStationLayer';
import RegionLayer from "../Components/RegionLayer";
import RadioButtonGroup from '../Components/RadioButtonGroup';
import Checkbox from '../Components/Checkbox';
import HeatmapLayer from "../Components/HeatmapLayer";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import nl from 'date-fns/locale/nl';

const Home = () => {
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [regionData, setRegionData] = useState([]);
    const [tempMeasurements, setTempMeasurements] = useState([]);

    const [showTemp, setShowTemp] = useState(false)
    const [showDataStations, setShowDataStations] = useState(false);
    const [showRegions, setShowRegions] = useState(true);

    const [dateTime, setDateTime] = useState(new Date());
    const calRef = useRef();

    const [toggleRegion, setToggleRegion] = useState("relatief");

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

    function handleAxiosError(error) {
        setErrMsg('Het ophalen van de gegevens is mislukt');
    }

    function toggleRegionLayer() {
        if (toggleRegion === "relatief") {
            setToggleRegion("absoluut");
        }
        else {
            setToggleRegion("relatief");
        }
    }

    useEffect(() => {
        try {
            // Get measurements data
            api.get(`/measurement/history?timestamp=${dateTime.toISOString()}`)
                .then(resp => {
                    setTempMeasurements(resp.data)
                })
                .catch(function (error) {
                    handleAxiosError(error);
                });
            
            // Get neighbourhood data
            api.get('/neighbourhood/all')
                .then((response) => {
                    setRegionData(response.data);
                })
                .catch(function (error) {
                    handleAxiosError(error);
                });
        }
        catch (error) {
            // Errors don't reach this catch, check function 'handleAxiosError'
            setErrMsg('Fout bij ophalen kaart-data.');
        }
    }, [dateTime])

    return (
        <section className="home-section">
            <div className="map-container">
                {
                    errMsg && (
                        <div className="error-overlay">
                            <p ref={errRef} aria-live="assertive">{errMsg}</p>
                            <button className="button" onClick={() => window.location.reload(false)}>Opnieuw proberen</button>
                        </div>
                    )
                }

                <MapContainer center={[51.565120, 5.066322]} zoom={13} maxZoom={15} minZoom={11} closePopupOnClick={false}>
                    <TileLayer 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { showRegions && <RegionLayer data={ regionData } toggleRegion={ toggleRegion }></RegionLayer> }
                    <MeetStationLayer data={ tempMeasurements } visible={ showDataStations } selectedDate={ dateTime }></MeetStationLayer>
                    { tempMeasurements != null && <HeatmapLayer data={ tempMeasurements } visible={ showTemp } ></HeatmapLayer> }
                </MapContainer>

                <div className="legend">
                    {showRegions && <button className="btn btn-secondary" onClick={toggleRegionLayer}>{toggleRegion}</button>}
                    <RadioButtonGroup
                        handleToggleShowRegions={handleToggleShowRegions}
                        handleToggleTemp={handleToggleTemp}
                    />
                    <Checkbox handleToggleShowDataStations={handleToggleShowDataStations} />
                    <ReactDatePicker
                        className="outline-none border-0"
                        ref={calRef}
                        locale={nl}
                        selected={dateTime}
                        onChange={(date) => setDateTime(date)}
                        showIcon
                        showTimeInput
                        dateFormat={"dd/MM/yyyy HH:mm"}
                    >
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setDateTime(new Date());
                                calRef.current.setOpen(false);
                            }}
                        >
                            Momenteel
                        </button>
                    </ReactDatePicker>
                </div>
            </div>
        </section>
    )
}

export default Home
