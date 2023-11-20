import React, {useState} from "react";

const Radiobutton = ({data, handleChange}) =>{
    const [selectedOption, setSelectedOption] = useState('tempreture');
    if (data === null || data === undefined || data[0] === null || data[0] === undefined){
        return <></>
    }

    const fieldNames = Object.keys(data[0]);

    const results = [];
    fieldNames.forEach(fieldName => {
        if (fieldName === 'timestamp' || fieldName === 'id'|| fieldName === 'longitude'|| fieldName === 'latitude'){
        }
        else {
            results.push(
                <div>
                    <label>
                        <input type="radio" value={fieldName} checked={selectedOption === fieldName}
                               onChange={e => {
                                   handleChange(fieldName);
                                   setSelectedOption(fieldName);
                               }}/>
                        {fieldName}
                    </label>
                    <br/>
                </div>)
        }
    })

return(<div>
    {results}
</div>)
}
export default Radiobutton;