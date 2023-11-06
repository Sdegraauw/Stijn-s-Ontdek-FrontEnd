import { Marker, Popup } from "react-leaflet";
import { RoundToOneDecimal } from "../Lib/Utility";

const MeetStationLayer = ({ data, visible }) => {
    console.log(data);
    if (!visible) return (<></>);

    return (
        <>
            {data.map((meting) => (
                <Marker key={meting.id} position={[meting.latitude, meting.longitude]}>
                    <Popup>
                        <label className="bold">Station ID: {meting.id}</label>

                        <div key={meting.id}>
                            <label>Temperatuur: {RoundToOneDecimal(meting.temperature)} °C</label>
                            <br />
                            <label>Luchtvochtigheid: {RoundToOneDecimal(meting.humidity)}%</label>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default MeetStationLayer;