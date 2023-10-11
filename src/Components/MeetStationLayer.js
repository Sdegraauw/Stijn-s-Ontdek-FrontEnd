import {Marker, Popup} from "react-leaflet";

const MeetStationLayer = ({ data, visible }) => {
    if (!visible) return (<></>);

    return (
        <>
            {data.map((meting) => (
                <Marker key={meting.id} position={[meting.latitude, meting.longitude]}>
                    <Popup>
                        <label className="bold">{meting.id}</label>

                        <div key={meting.id}>
                            <label>
                                {meting.temperature}°C
                            </label>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default MeetStationLayer;