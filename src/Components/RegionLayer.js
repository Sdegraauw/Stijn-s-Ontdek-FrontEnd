import {Polygon, Popup} from "react-leaflet";
import { RoundToOneDecimal } from "../Lib/Utility";

const RegionLayer = ({ data, visible }) => {
    if (!visible) return (<></>);
    let mintemp= -15;
    let tempDif = 55;

    function setRegionColour(value){
        let contrastValue = (value-mintemp)/tempDif;
        let red = Math.round(Red(contrastValue)*255);
        let green = Math.round(Green(contrastValue)*255);
        let blue = Math.round(Blue(contrastValue)*255);

        let rgb = {red,green,blue}
        return  "rgb("+rgb.red.toString()+","+
            rgb.green.toString()+","+
            rgb.blue.toString()+")";
    }
    function Red(contrastValue){
        return (Math.pow(2,contrastValue)-1);
    }
    function Green(contrastValue){
        return Math.abs((-4*Math.pow(contrastValue,2))+(4*contrastValue));
    }
    function Blue(contrastValue){
        return (1-(Math.pow(2,contrastValue)-1));
    }

    return (
        <>
            {data.map(( neighbourhood ) => (
                <Polygon positions={ neighbourhood.coordinates } key={ neighbourhood.id } color={getRegionColor(neighbourhood.id)} opacity={0.25} fillOpacity={0.2}>
                    <Popup>
                        <label className="bold">{ neighbourhood.name }</label> <br />

                        <div>
                            <label>
                                {/* TODO: Netter neerzetten */}
                                { neighbourhood.avgTemp !== "NaN" ? "Gemiddelde wijktemperatuur: " + RoundToOneDecimal(neighbourhood.avgTemp) + " °C" : "Geen data beschikbaar" }
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

const colors = {
    1: "red", 2: "red", 3: "red", 4: "red", 5: "red", 6: "red", 7: 'red', 8: "red", 9: "red", 10: "red",
    11: "red", 12: "red", 13: "red", 14: "red", 15: "red", 16: "red", 17: 'red', 18: "red", 19: "red", 20: "red",
    21: "red", 22: "red", 23: "red", 24: "red", 25: "red", 26: "red", 27: 'red', 28: "red", 29: "red", 30: "red",
    31: "red", 32: "red", 33: "red", 34: "red", 35: "red", 36: "red", 37: 'red', 38: "red", 39: "red", 40: "red",
    41: "red", 42: "red", 43: "red", 44: "red", 45: "red", 46: "red", 47: "red", 48: "red", 49: "red", 50: "red"
}

export default RegionLayer;