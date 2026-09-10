const { useState } = React;

export const ColorPicker = () => {
    const [colored, setColored] = useState("#ffffff");

    const handleChange = (e) => {
        setColored(e.target.value);


    }
    return (
        <div id="color-picker-container" style={{ backgroundColor: colored }}>
            <input id="color-input" type="color" onChange={handleChange} value={colored} />
        </div>
    )
};