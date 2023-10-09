import {Marker, Popup} from "react-leaflet";

const MeetStationLayer = ({ data, visible }) => {
    if (!visible) return (<></>);

    return (
        <>
            {data.map(({ id, latitude, longitude, name, sensors }) => (
                <Marker key={id} position={[latitude, longitude]}>
                    <Popup>
                        <label className="bold">{name}</label>

                        {sensors.map(({ id, typeId, data }) => (
                            <div key={id}>
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

export default MeetStationLayer;