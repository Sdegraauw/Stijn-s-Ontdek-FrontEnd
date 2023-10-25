import {Polygon, Popup} from "react-leaflet";

const RegionLayer = ({ data, visible }) => {
    if (!visible) return (<></>);

    return (
        <>
            {data.map(( neighbourhood ) => (
                <Polygon positions={ neighbourhood.coordinates } key={ neighbourhood.id } color={getRegionColor(neighbourhood.id)} opacity={0.25} fillOpacity={0.2}>
                    <Popup>
                        <label className="bold">Algemene data { neighbourhood.name }</label> <br />

                        <div>
                            <label>
                                { neighbourhood.avgTemp }
                            </label>
                        </div>
                    </Popup>
                </Polygon>
            ))}
        </>)

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
function getRegionColor(regionId) {
    if (regionId <= 50) return colors[regionId];
    else return regionId[1];
}

//colours regions
/*const colors = {
    1: "red", 2: "green", 3: "blue", 4: "purple", 5: "cyan", 6: "brown", 7: '#F73D94', 8: "pink", 9: "gray", 10: "yellow",
    11: "red", 12: "green", 13: "blue", 14: "purple", 15: "cyan", 16: "brown", 17: '#F73D94', 18: "pink", 19: "gray", 20: "green",
    21: "red", 22: "green", 23: "blue", 24: "purple", 25: "cyan", 26: "brown", 27: '#F73D94', 28: "pink", 29: "gray", 30: "green",
    31: "red", 32: "green", 33: "blue", 34: "purple", 35: "cyan", 36: "brown", 37: '#F73D94', 38: "pink", 39: "gray", 40: "green",
    41: "red", 42: "green", 43: "blue", 44: "purple", 45: "red", 46: "green", 47: "blue", 48: "purple", 49: "red", 50: "green"
}*/

const colors = {
    1: "red", 2: "red", 3: "red", 4: "red", 5: "red", 6: "red", 7: 'red', 8: "red", 9: "red", 10: "red",
    11: "red", 12: "red", 13: "red", 14: "red", 15: "red", 16: "red", 17: 'red', 18: "red", 19: "red", 20: "red",
    21: "red", 22: "red", 23: "red", 24: "red", 25: "red", 26: "red", 27: 'red', 28: "red", 29: "red", 30: "red",
    31: "red", 32: "red", 33: "red", 34: "red", 35: "red", 36: "red", 37: 'red', 38: "red", 39: "red", 40: "red",
    41: "red", 42: "red", 43: "red", 44: "red", 45: "red", 46: "red", 47: "red", 48: "red", 49: "red", 50: "red"
}

export default RegionLayer;