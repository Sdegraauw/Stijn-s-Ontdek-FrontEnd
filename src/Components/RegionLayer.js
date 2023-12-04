import { Polygon, Popup } from "react-leaflet";
import { RoundToOneDecimal } from "../Lib/Utility";
import { useEffect, useRef, useState } from "react";
import { api } from "../App";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import ReactDatePicker from "react-datepicker";

const RegionLayer = ({ data, toggleRegion }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [graphData, setGraphData] = useState([]);
    const [selectedNeighbourhood, setSelectedNeighbourhood] = useState(null);
    const [showMinTemp, setShowMinTemp] = useState(false);
    const [showMaxTemp, setShowMaxTemp] = useState(false);
    const [showGemTemp, setShowGemTemp] = useState(false);
    const errRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState(false);

    let mintemp = -10;
    let tempDif = 40;

    if (toggleRegion === "relatief") {
        let maxtemp = Number.MIN_VALUE;
        mintemp = Number.MAX_VALUE;
        tempDif = 1;

        data.forEach((neighbourhood) => {
            if (!isNaN(neighbourhood.avgTemp)) {
                if (neighbourhood.avgTemp < mintemp) {
                    mintemp = neighbourhood.avgTemp;
                }
                if (neighbourhood.avgTemp > maxtemp) {
                    maxtemp = neighbourhood.avgTemp;
                }
            }
        });

        if (maxtemp - mintemp !== 0) {
            tempDif = maxtemp - mintemp;
        }
    }

    function setRegionColour(value) {
        if (isNaN(value))
            return "rgb(100,100,100)";

        let contrastValue = (value - mintemp) / tempDif;

        if (contrastValue < 0)
            contrastValue = 0;
        else if (contrastValue > 1)
            contrastValue = 1;

        let red = Math.round(Red(contrastValue) * 255);
        let green = Math.round(Green(contrastValue) * 255);
        let blue = Math.round(Blue(contrastValue) * 255);

        return "rgb(" + red.toString() + "," +
            green.toString() + "," +
            blue.toString() + ")";
    }

    function Red(contrastValue) {
        return (Math.pow(2, contrastValue) - 1);
    }

    function Green(contrastValue) {
        return Math.abs((-4 * Math.pow(contrastValue, 2)) + (4 * contrastValue));
    }

    function Blue(contrastValue) {
        return ((Math.pow(2, 1 - contrastValue) - 1));
    }

    useEffect(() => {
        if (selectedNeighbourhood === null)
            return;

        setLoading(true);

        const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
        api.get("/neighbourhood/history/average/" + selectedNeighbourhood, {
            params: {
                startDate: startDate.toLocaleString("nl-NL", options),
                endDate: endDate.toLocaleString("nl-NL", options)
            }
        }).then((response) => {
            const data = response.data.map((meting) => ({
                timestamp: meting.timestamp,
                avgTemp: meting.avgTemp,
                minTemp: meting.minTemp,
                maxTemp: meting.maxTemp
            }));
            setGraphData(data);
            setLoading(false);
        }).catch(handleError);
    }, [selectedNeighbourhood, startDate, endDate]);

    function handleError() {
        setErrorMessage("Het ophalen van de gegevens is mislukt");
    }

    const handleClick = (e) => {
        if (startDate.getTime() === endDate.getTime()) {
            let date = startDate;
            date.setMonth(date.getMonth() - 1);
            setStartDate(date);
        }

        setSelectedNeighbourhood(e.target.options.id);
    }

    const handleLegendChange = (e) => {
        if (e.dataKey === "minTemp")
            setShowMinTemp(!showMinTemp);
        if (e.dataKey === "maxTemp")
            setShowMaxTemp(!showMaxTemp);
        if (e.dataKey === "avgTemp")
            setShowGemTemp(!showGemTemp);
    }

    return (
        <>
            {
                data.map((neighbourhood) => (

                    <Polygon
                        positions={neighbourhood.coordinates}
                        key={neighbourhood.id}
                        id={neighbourhood.id}
                        pathOptions={{ color: setRegionColour(neighbourhood.avgTemp) }}
                        opacity={neighbourhood.avgTemp === "NaN" ? .4 : 1}
                        fillOpacity={neighbourhood.avgTemp === "NaN" ? .25 : .5}
                        eventHandlers={{ click: handleClick }}
                    >
                        <Popup>
                            <label className="bold">{neighbourhood.name}</label> <br />

                            <div>
                                <label>
                                    {neighbourhood.avgTemp !== "NaN" ? "Gemiddelde wijktemperatuur: " + RoundToOneDecimal(neighbourhood.avgTemp) + " °C" : "Geen data beschikbaar"}
                                </label>
                            </div>

                            <hr></hr>

                            <label className="bold mt-2">Historische temperatuur data</label>

                            {
                                errorMessage && (
                                    <div>
                                        <p className={'text-danger m-0'} ref={errRef} aria-live="assertive">{errorMessage}</p>
                                    </div>
                                )
                            }

                            {
                                loading && (
                                    <div>
                                        <p className={'text-warning m-0'}>Data wordt opgehaald...</p>
                                    </div>
                                )
                            }

                            <ResponsiveContainer minWidth={250} minHeight={250}>
                                <LineChart data={graphData}>
                                    <XAxis dataKey="timestamp" />
                                    <YAxis width={20} />
                                    <CartesianGrid stroke="#ccc" />
                                    <Legend onClick={handleLegendChange} />
                                    <Line type="monotone" dataKey="minTemp" name="Min" stroke="#0000ff" hide={showMinTemp} dot={false} />
                                    <Line type="monotone" dataKey="maxTemp" name="Max" stroke="#ff0000" hide={showMaxTemp} dot={false} />
                                    <Line type="monotone" dataKey="avgTemp" name="Gemiddeld" stroke="#00ee00" hide={showGemTemp} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>

                            <div className="container text-center">
                                <div className="row gy-2">
                                    <div className="col">
                                        <label className="me-2">Start datum</label>
                                        <ReactDatePicker className="border border-secondary" dateFormat="dd-MM-yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>
                                    <div className="col">
                                        <label className="me-2">Eind datum</label>
                                        <ReactDatePicker className="border border-secondary" dateFormat="dd-MM-yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Polygon>
                ))
            }
        </>)

}

export default RegionLayer;