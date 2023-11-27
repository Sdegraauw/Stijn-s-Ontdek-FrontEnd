import { useMap } from 'react-leaflet';
import HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap.js';

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
    });
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
        '.2'    : '#5568B8',
        // '.35'    : '#4E79C5',
        '.35' : '#4D8AC6',
        // '.15': '#4E96BC',
        // '.2': '#549EB3',
        // '.25': '#59A5A9',
        // '.3': '#60AB9E',
        //'.4': '#69B190',
        '.5': '#69B190',
        // '.4': '#77B77D',
        // '.5'    : '#8CBC68',           // green
        // '.6': '#A6BE54',            
        // '.6'    : '#BEBC48',              
        //'.6'    : '#D1B541',
        '.7'    : '#D1B541',// yellow
        //'.8'   : '#DDAA3C',               // yellow
        '.83'   : '#DDAA3C',
        // '.9'   : '#E49C39',              
        //'.85'   : '#E78C35',              // pumpkin orange
        '.86'   : '#E78C35',
        // '.85'    : '#E67932',          // orange
        //'.94'   : '#E4632D',              // dark orange
        '.96'   : '#E4632D',
        //'.96'   : '#DF4828',              // orange red
        '.965'   : '#DF4828',
        '.975'   : '#DA2222',              // red
        '.995'   : '#DA2222',
        '1'     : '#B8221E'               // red brown
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