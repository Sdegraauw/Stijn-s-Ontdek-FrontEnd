import React, { useState } from 'react';

export default function RadioButtonGroup(props) {
    const [selectedOption, setSelectedOption] = useState(props.options[0].key);

    function handleChange(event) {
        setSelectedOption(event.target.key);
    }

    return (
        <div>
            {props.options.map(option => (
                <label key={option.key}>
                    <input
                        type="radio"
                        value={option.key}
                        checked={selectedOption === option.key}
                        onChange={e => {
                            handleChange(e);
                            option.onChange(e);
                        }}
                    />
                    {option.key}
                </label>
            ))}
        </div>
    );
}