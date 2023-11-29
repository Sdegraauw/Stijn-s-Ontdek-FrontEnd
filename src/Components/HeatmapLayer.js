import { useMap } from 'react-leaflet';
import HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap.js';
import {spectralColors} from '../Lib/Utility.js';

const HeatmapLayer = ({ data, visible, type }) => {
    let maxval = Number.MIN_VALUE;
    let minval = Number.MAX_VALUE;
    data.forEach(meting => {
        if (meting[type]){
            if (meting[type] > maxval) {
                maxval = meting[type];
            }
            if (meting[type] < minval) {
                minval = meting[type];
            }
        }

    const heatmapReadyData = [];
    data.map(meting => {
        if (meting[type]){
            heatmapReadyData.push(
                {
                    lat: meting.latitude,
                    lng: meting.longitude,
                    val: meting[type],
                    count: 1
                });
        }
    })

    data = {
        max: maxval,
        min: minval-((maxval-minval)*0.5),
        data:heatmapReadyData
    };

    const radius_preview = 0.015;
    // Gradient color should taper off exponentially towards the bottom and top
    const rainbow_gradient = {
        '.2': spectralColors.coldBlue,
        '.35': spectralColors.warmBlue,
        '.5': spectralColors.green,
        '.7': spectralColors.coldYellow,
        '.83': spectralColors.warmYellow,
        '.86': spectralColors.coldOrange,
        '.96': spectralColors.mediumOrange,
        '.965': spectralColors.warmOrange,
        '.975': spectralColors.coldRed,
        '.995': spectralColors.mediumRed,
        '1': spectralColors.warmRed
    }

    const tempConfig = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": radius_preview,
        "maxOpacity": .85,
        "minOpacity": .08,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": false,
        // enter n keys between 0 and 1 here for gradient color customization
        "gradient": rainbow_gradient,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'val',
    };

    const map = useMap();
    const heatmapLayer = new HeatmapOverlay(tempConfig);
    heatmapLayer.setData(data);

    if (visible) {
        map.eachLayer(function (layer) {
            if (layer._heatmap)
                layer.remove();
        })
        map.addLayer(heatmapLayer);
    } else {
        map.eachLayer(function (layer) {
            if (layer._heatmap)
                layer.remove();
        })
    }
}

export default HeatmapLayer;