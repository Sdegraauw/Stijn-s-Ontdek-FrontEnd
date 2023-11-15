import { Polygon, Popup } from "react-leaflet";
import { RoundToOneDecimal } from "../Lib/Utility";

const RegionLayer = ({ data, toggleRegion }) => {

    let mintemp = -10;
    let tempDif = 40;

    if (toggleRegion === 'relative') {
        let maxtemp = Number.MIN_VALUE;
        mintemp = Number.MAX_VALUE;
        tempDif = 1;

        data.map((neighbourhood) => {
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

    return (
        <>
            { 
                data.map((neighbourhood) => (
                    <Polygon positions={ neighbourhood.coordinates } key={ neighbourhood.id } pathOptions={{color:setRegionColour(neighbourhood.avgTemp)}} opacity={ neighbourhood.avgTemp === "NaN" ? .4 : 1 } fillOpacity={ neighbourhood.avgTemp === "NaN" ? .25 : .5 }>
                        <Popup>
                            <label className="bold">{ neighbourhood.name }</label> <br />

                            <div>
                                <label>
                                    {/* TODO: Netter neerzetten */}
                                    {neighbourhood.avgTemp !== "NaN" ? "Gemiddelde wijktemperatuur: " + RoundToOneDecimal(neighbourhood.avgTemp) + " °C" : "Geen data beschikbaar"}
                                </label>
                            </div>
                        </Popup>
                    </Polygon>
                )) 
            }
        </>)

}

export default RegionLayer;