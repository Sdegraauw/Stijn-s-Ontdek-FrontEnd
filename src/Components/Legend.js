import React, { useEffect, useState } from 'react'

const Legend = ({ temperatures, legendLayer }) => {
    const [temperatureRanges, setTemperatureRanges] = useState([]);
    const [temperatureColors, setTemperatureColors] = useState([]);

    console.log(legendLayer);

    // useEffect(() => {
    //     if (legendLayer === "heatmap") {
    //         setTemperatureColors(heatMapColors);
    //     } else {
    //         setTemperatureColors(regionColors);
    //     }

    // }, [legendLayer])

    const regionColors = [
        { color: '#0247FE' },
        { color: '#AED581' },
        { color: '#F1E13C' },
        { color: '#F8AB2C' },
        { color: '#FF8A65' },
        { color: '#C83433' },
    ];

    const heatMapColors = [
        { color: 'blue' },
        { color: 'green' },
        { color: 'gold' },
        { color: 'darkorange' },
        { color: 'orangered' },
        { color: 'red' },
    ];

    useEffect(() => {
        console.log(legendLayer);
        if (legendLayer === "heatmap") {
            setTemperatureColors(regionColors);
        } else {
            setTemperatureColors(heatMapColors);
        }

        const minTemp = Math.min(...temperatures.map(measurement => measurement.temperature));
        const maxTemp = Math.max(...temperatures.map(measurement => measurement.temperature));

        const temperatureParts = (maxTemp - minTemp) / 5;

        const temperatureRanges = temperatureColors.map((color, index) => {
            const min = Math.round(minTemp + (temperatureParts * index));
            const max = Math.round(minTemp + (temperatureParts * (index + 1)));
            return { ...color, min, max };
        });

        setTemperatureRanges(temperatureRanges);
    }, [temperatures, legendLayer])

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
    )
}

export default Legend