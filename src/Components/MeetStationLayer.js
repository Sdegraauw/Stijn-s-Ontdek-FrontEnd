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

function getDataTypeSuffix(typeId) {
    switch (typeId) {
        case 1:
            return "°C";
        case 2:
            return "ppm";
        case 3:
            return "ppm";
        case 4:
            return "ppm";
        case 5:
            return "%";
        case 6:
            return "km/h";
        default:
            return "Onbekend.";
    }
}



function getDataType(typeId) {
    switch (typeId) {
        case 1:
            return "Temperatuur";
        case 2:
            return "Stikstof (N2)";
        case 3:
            return "koolstofdioxide (CO2)";
        case 4:
            return "Fijnstof (PPM)";
        case 5:
            return "Luchtvochtigheid";
        case 6:
            return "Windsnelheid";
        default:
            return "Onbekend.";
    }
}
export default MeetStationLayer;