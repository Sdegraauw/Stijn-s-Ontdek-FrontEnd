import React, { useState } from 'react';

const RadioButtons = (props) => {
    const [selectedOption, setSelectedOption] = useState("option1");
    function handleChange(event) {
        setSelectedOption(event.target.value);
        console.log(selectedOption)
    }
    return (
        <div>
            <label>
                <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={e => { handleChange(e); props.handleToggleShowRegions() }} />
                Regio's
            </label>
            <br />
            <label>
                <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={e => { handleChange(e); props.handleToggleTemp() }} />
                Temperatuur
            </label>
            <br />
        </div>
    );
}

export default RadioButtons;