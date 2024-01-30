import React, {useState} from "react";

const Radiobutton = ({data, handleChange, current}) =>{
    const [selectedOption, setSelectedOption] = useState(current);

    //makes sure there is data
    if (data === undefined || data.measurements[0] === undefined){
        return <></>
    }

    let fieldNames = Object.keys(data.measurements[0]);

    const results = [];
    fieldNames.forEach(field => {
        //excludes fields that should not get shown
        if (field !== 'id' && field !== 'latitude' && field !== 'longitude' && field !== 'timestamp') {
            results.push(
                <div>
                    <label>
                        <input type="radio" value={field} checked={selectedOption === field}
                               onChange={e => {
                                   handleChange(field.toLowerCase());
                                   setSelectedOption(field);
                               }}/>
                            { field.charAt(0).toUpperCase() + field.substring(1) }
                    </label>
                    <br/>
                </div>
            )
        }
    })

    return (
        <div>
            {results}
        </div>
    )
}
export default Radiobutton;