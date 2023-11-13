import { useMap } from 'react-leaflet';
import HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap.js';
import { useEffect, useRef } from 'react';

const HeatmapLayer = ({ data }) => {

    let maxTemp = 0;
    data.forEach(meting => {
      if(meting.temperature > maxTemp) {
        maxTemp = meting.temperature;
      }
    })

    const changedDataFormat = {
        max : maxTemp,
        data : data.map(meting => {
          return {
            lat : meting.latitude,
            lng : meting.longitude,
            temp : meting.temperature,
            count : 1
          }
        })
      }

      var radius_preview = 0.015;
      var gradient_preview = {
        '.05': 'blue',
        '.4': 'green',
        '.7': 'yellow',
        '.9': 'red'
      }
      var radius_current = 0.0095
      // Gradient color should taper off exponentially towards the bottom and top
      var gradient_current = {
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

      var tempConfig = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": radius_current,
        "maxOpacity": .8,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": false,
        // enter n keys between 0 and 1 here for gradient color customization
        "gradient": gradient_current,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'temp'
      };
    
    
    // const mapRef = useRef();
    // useEffect(() => {
    //   mapRef.current = useMap();
    // }, [])
    const map = useMap();

    var tempHeatmapLayer = new HeatmapOverlay(tempConfig);
    tempHeatmapLayer.setData(changedDataFormat);

    //mapRef.addLayer(tempHeatmapLayer);
    map.addLayer(tempHeatmapLayer);
}

export default HeatmapLayer;