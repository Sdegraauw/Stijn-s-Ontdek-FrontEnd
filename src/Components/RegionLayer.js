import { Polygon, Popup } from "react-leaflet";
import { RoundToOneDecimal } from "../Lib/Utility";
import {spectralColors} from '../Lib/Utility.js';

const RegionLayer = ({ data }) => {
    let mintemp = Number.MAX_VALUE;
    let maxtemp = Number.MIN_VALUE;
    let tempDif = 1;

    data.forEach((neighbourhood) => {
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

    var colorDictionary = {
        0: spectralColors.coldBlue,
        1: spectralColors.warmBlue,
        2: spectralColors.green,
        3: spectralColors.coldYellow,
        4: spectralColors.warmYellow,
        5: spectralColors.coldOrange,
        6: spectralColors.mediumOrange,
        7: spectralColors.warmOrange,
        8: spectralColors.coldRed,
        9: spectralColors.mediumRed,
        10: spectralColors.warmRed,
    }

    function setRegionColour(value) {
        if (isNaN(value))
            return "rgb(136,136,136)";

        let contrastValue = (value - mintemp) / tempDif;
        let colorIndex = Math.round(contrastValue * (Object.keys(colorDictionary).length - 1));
        return colorDictionary[colorIndex];;
    }

    return (
        <>
            {
                data.map((neighbourhood) => (
                    <Polygon positions={neighbourhood.coordinates} key={neighbourhood.id} pathOptions={{ color: setRegionColour(neighbourhood.avgTemp) }} opacity={neighbourhood.avgTemp === "NaN" ? .4 : 1} fillOpacity={neighbourhood.avgTemp === "NaN" ? .25 : .5}>
                        <Popup>
                            <label className="bold">{neighbourhood.name}</label> <br />

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