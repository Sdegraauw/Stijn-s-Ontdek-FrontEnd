import { Marker, Popup, Tooltip } from "react-leaflet";
import { RoundToOneDecimal } from "../Lib/Utility";
import { api } from "../App";
import { useEffect, useState, forwardRef } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const MeetStationLayer = ({ data, visible }) => {
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [graphData, setGraphData] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [showMinTemp, setShowMinTemp] = useState(false);
    const [showMaxTemp, setShowMaxTemp] = useState(false);
    const [showGemTemp, setShowGemTemp] = useState(false);

    useEffect(() => {
        if (selectedStation === null) return;

        const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
        api.get("/measurement/history/average/" + selectedStation, {
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
        });
    }, [selectedStation, startDate, endDate]);

    const onClick = (e) => {
        if (startDate.getTime() === endDate.getTime()) {
            let date = startDate;
            date.setMonth(date.getMonth() - 1);
            setStartDate(date);
        }

        setSelectedStation(e.target.options.id);
    }

    const handleLegendChange = (e) => {
        if (e.dataKey === "minTemp")
            setShowMinTemp(!showMinTemp);
        if (e.dataKey === "maxTemp")
            setShowMaxTemp(!showMaxTemp);
        if (e.dataKey === "avgTemp")
            setShowGemTemp(!showGemTemp);
    }

    if (!visible) return (<></>);

    return (
        <>
            {data.map((meting) => (
                <Marker key={ meting.id } id={ meting.id } position={[ meting.latitude, meting.longitude ]} onclick={ onClick }>
                    <Popup>
                        <label className="bold">Station ID: { meting.id }</label>

                        <div key={ meting.id }>
                            <label>Temperatuur: { RoundToOneDecimal(meting.temperature) } °C</label>
                            <br/>
                            <label>Luchtvochtigheid: { RoundToOneDecimal(meting.humidity) }%</label>
                        </div>

                        <label className="bold mt-2">Historische temperatuur data</label>
                        <ResponsiveContainer minWidth={250} minHeight={250}>
                            <LineChart data={ graphData }>
                                <XAxis dataKey="timestamp" />
                                <YAxis width={ 20 } />
                                <CartesianGrid stroke="#ccc" />
                                <Tooltip />
                                <Legend onClick={ handleLegendChange } />
                                <Line type="monotone" dataKey="minTemp" name="Min" stroke="#0000ff" hide={ showMinTemp } />
                                <Line type="monotone" dataKey="maxTemp" name="Max" stroke="#ff0000" hide={ showMaxTemp } />
                                <Line type="monotone" dataKey="avgTemp" name="Gemiddeld" stroke="#60f3f4" hide={ showGemTemp } />
                            </LineChart>
                        </ResponsiveContainer>

                        <div className="container-fluid row m-0 p-0">
                            <div className="col-6">
                                <ReactDatePicker showIcon dateFormat="dd-MM-yyyy" selected={ startDate } onChange={ (date) => setStartDate(date) } />
                            </div>
                            <div className="col-6">
                                <ReactDatePicker showIcon dateFormat="dd-MM-yyyy" selected={ endDate } onChange={ (date) => setEndDate(date) } />
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default MeetStationLayer;