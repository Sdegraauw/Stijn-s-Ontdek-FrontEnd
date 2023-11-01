import { Marker, Popup } from "react-leaflet";
import { RoundToOneDecimal } from "../Lib/Utility";
import { api } from "../App";
import { useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const MeetStationLayer = ({ data, visible }) => {
    const onClick = (e) => {
        var endDate = new Date();
        var startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
        api.get("/measurement/history/average/" + e.target.options.id, {
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
    }

    const [graphData, setGraphData] = useState([]);

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
                                <Line type="basis" dataKey="minTemp" name="Min" stroke="#0000ff" dot={ false } />
                                <Line type="basis" dataKey="maxTemp" name="Max" stroke="#ff0000" dot={ false } />
                                <Line type="basis" dataKey="avgTemp" name="Gemiddeld" stroke="#60f3f4" dot={ false } />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="timestamp">
                                    {/* <Label>Datum</Label> */}
                                </XAxis>
                                <YAxis width={ 20 }>
                                    {/* <Label>°C</Label> */}
                                </YAxis>
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default MeetStationLayer;