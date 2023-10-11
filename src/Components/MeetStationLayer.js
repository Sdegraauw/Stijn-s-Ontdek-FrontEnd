import {Marker, Popup} from "react-leaflet";

const MeetStationLayer = ({ data, visible }) => {
    if (!visible) return (<></>);

    return (
        <>
            {data.map((meting) => (
                <Marker key={meting.id} position={[meting.latitude, meting.longitude]}>
                    <Popup>
                        <label className="bold">Station ID: {meting.id}</label>

                        <div key={meting.id}>
                            <label>Temperatuur: {RoundToOneDecimal(meting.temperature)} °C</label>
                            <br/>
                            <label>Luchtvochtigheid: {RoundToOneDecimal(meting.humidity)}%</label>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

function RoundToOneDecimal(meting) {
    return Math.round(meting * 10)/10;
}

export default MeetStationLayer;