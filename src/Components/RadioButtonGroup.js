import React, { useState } from 'react';

const RadioButtonGroup = (props) => {
    const [selectedOption, setSelectedOption] = useState("regio");
    function handleChange(event) {
        setSelectedOption(event.target.value);
    }
    return (
        <div>
            <label>
                <input type="radio" value="regio" checked={selectedOption === 'regio'} onChange={e => { handleChange(e); props.handleToggleShowRegions() }} />
                Regio's
            </label>
            <br />
            <label>
                <input type="radio" value="hittenkaart" checked={selectedOption === 'hittenkaart'} onChange={e => { handleChange(e); props.handleToggleTemp() }} />
                Hittenkaart
            </label>
            <br />
        </div>
    );
}

export default RadioButtonGroup;