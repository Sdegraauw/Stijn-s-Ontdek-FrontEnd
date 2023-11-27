import { useMap } from 'react-leaflet';
import HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap.js';

const HeatmapLayer = ({ data, visible, type }) => {
    let maxval = Number.MIN_VALUE;
    let minval = Number.MAX_VALUE;
    data.forEach(meting => {
        if (meting[type] > maxval) {
            maxval = meting[type];
        }
        if (meting[type] < minval) {
            minval = meting[type];
        }
    });

    data = {
        max: maxval,
        min: minval,
        data:
            data.map(meting => {
                return {
                    lat: meting.latitude,
                    lng: meting.longitude,
                    val: meting[type],
                    count: 1
                }
            })
    };

    const radius_preview = 0.015;
    // Gradient color should taper off exponentially towards the bottom and top
    const gradient_current = {
        '.05': 'blue',
        '.5': 'green',
        '.6': 'yellow',
        '.8': 'gold',
        '.9': 'orange',
        '.95': 'darkorange',
        '.99': 'orangered',
        '.995': 'red',
        '1': 'firebrick'
    }

    const rainbow_gradient = {
        '.2'    : '#5568B8',
        // '.35'    : '#4E79C5',
        '.35' : '#4D8AC6',
        // '.15': '#4E96BC',
        // '.2': '#549EB3',
        // '.25': '#59A5A9',
        // '.3': '#60AB9E',
        '.4': '#69B190',
        // '.4': '#77B77D',
        // '.5'    : '#8CBC68',           // green
        // '.6': '#A6BE54',            
        // '.6'    : '#BEBC48',              
        '.6'    : '#D1B541',           // yellow         
        '.8'   : '#DDAA3C',               // yellow
        // '.9'   : '#E49C39',              
        '.85'   : '#E78C35',              // pumpkin orange
        // '.85'    : '#E67932',          // orange
        '.94'   : '#E4632D',              // dark orange
        '.96'   : '#DF4828',              // orange red
        '.98'   : '#DA2222',              // red
        '1'     : '#B8221E'               // red brown
    }

    var colorDictionary = {
        ".05": "rgb(206,255,255)",
        ".30": "rgb(198,247,214)",
        ".50": "rgb(162,244,155)",
        ".65": "rgb(187,228,83)",
        ".78": "rgb(213,206,4)",
        ".85": "rgb(231,181,3)",
        ".90": "rgb(241,153,3)",
        ".94": "rgb(246,121,11)",
        ".97": "rgb(249,73,2)",
        ".99": "rgb(228,5,21)",
        "1": "rgb(168,0,3)",
    }
    var colorDictionary2 = {
        ".05": "rgb(255,255,229)",
        ".30": "rgb(255,247,188)",
        ".50": "rgb(254,227,145)",
        ".65": "rgb(254,196,79)",
        ".78": "rgb(251,154,41)",
        ".85": "rgb(236,112,20)",
        ".92": "rgb(204,76,2)",
        ".96": "rgb(153,52,4)",
        "1": "rgb(100,37,6)",
    }
    var colorDictionary3 = {
        ".05": "rgb(25,101,176)",
        ".30": "rgb(82,137,199)",
        ".50": "rgb(123,175,222)",
        ".65": "rgb(78,178,101)",
        ".78": "rgb(144,201,135)",
        ".85": "rgb(202,224,171)",
        ".90": "rgb(247,240,86)",
        ".94": "rgb(246,193,65)",
        ".97": "rgb(241,147,45)",
        ".99": "rgb(232,96,28)",
        "1": "rgb(220,5,12)",
    }
    var colorDictionary4 = {

        ".1": "rgb(25,101,176)",
        ".2": "rgb(82,137,199)",
        ".3": "rgb(123,175,222)",
        ".4": "rgb(78,178,101)",
        ".5": "rgb(144,201,135)",
        ".6": "rgb(247,240,86)",
        ".7": "rgb(246,193,65)",
        ".8": "rgb(241,147,45)",
        ".9": "rgb(232,96,28)",
        "1": "rgb(220,5,12)",
    }
    var colorDictionary5 = {
        "0.00": "rgb(140,78,153)",
        "0.04": "rgb(111,76,155)",
        "0.07": "rgb(96,89,169)",
        "0.11": "rgb(85,104,184)",
        "0.15": "rgb(78,121,197)",
        "0.19": "rgb(77,138,198)",
        "0.22": "rgb(78,150,188)",
        "0.26": "rgb(84,158,179)",
        "0.30": "rgb(89,165,169)",
        "0.33": "rgb(96,171,158)",
        "0.37": "rgb(105,177,144)",
        "0.41": "rgb(119,183,125)",
        "0.44": "rgb(140,188,104)",
        "0.48": "rgb(166,190,84)",
        "0.52": "rgb(190,188,72)",
        "0.56": "rgb(209,181,65)",
        "0.59": "rgb(221,170,60)",
        "0.63": "rgb(228,156,57)",
        "0.67": "rgb(231,140,53)",
        "0.70": "rgb(230,121,50)",
        "0.74": "rgb(228,99,45)",
        "0.78": "rgb(223,72,40)",
        "0.81": "rgb(218,34,34)",
        "0.85": "rgb(184,34,30)",
        "0.89": "rgb(149,33,27)",
        "0.93": "rgb(114,30,23)",
        "0.96": "rgb(82,26,19)",
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