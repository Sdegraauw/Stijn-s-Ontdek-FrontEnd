import React, { useEffect, useState } from 'react';
import { spectralColors } from '../Lib/Utility';

const ColorLegend = ({ temperatures }) => {
    const [temperatureRanges, setTemperatureRanges] = useState([]);

    useEffect(() => {

        //Null values are filtered out to prevent inconsistent legend
        const filteredTemps = temperatures.filter((measurement) => measurement.temperature !== null);

        const minTemp = Math.min(...filteredTemps.map(measurement => measurement.temperature));
        const maxTemp = Math.max(...filteredTemps.map(measurement => measurement.temperature));

        // Show 5 for the amount colors to show to prevent the screen be cluttered with 11 
        const numberOfColors = 5;
        const temperatureParts = (maxTemp - minTemp) / numberOfColors;

        // Creating the data point for each temperature block
        const temperatureRanges = Array.from({ length: numberOfColors }, (_, index) => {
            const min = (minTemp + temperatureParts * index).toFixed(1);
            const max = (minTemp + temperatureParts * (index + 1)).toFixed(1);
            const colorIndex = Math.floor((index / numberOfColors) * Object.keys(spectralColors).length);
            const color = spectralColors[Object.keys(spectralColors)[colorIndex]];
            return { color, min, max };
        });

        setTemperatureRanges(temperatureRanges);
    }, [temperatures]);

    return (
        <div className='legend-container'>
            {temperatureRanges.map((point, index) => (
                <div key={index} className='legend-item'>
                    <div className='legend-color' style={{ backgroundColor: point.color }}></div>
                    <div className='legend-label'>
                        <p>{point.min}-{point.max}°C</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default ColorLegend