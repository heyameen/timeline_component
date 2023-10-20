import React, { useState, useEffect } from 'react';


interface ColorPickerProps {
    selectedColor: string;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}
    
const ColorPicker: React.FC<ColorPickerProps> = ({setSelectedColor, selectedColor}) => { 
    

    return (
        <div style={{fontSize: '1.7rem', color: '#000', position:'relative'}}>
            <label htmlFor="colorPicker">Choose theme:</label>
            <input
                type="color"
                id="colorPicker"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
            />            
        </div>
    );
}

export default ColorPicker;
