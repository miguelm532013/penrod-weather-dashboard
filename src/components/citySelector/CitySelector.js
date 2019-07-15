import React, { useState } from 'react';
import { Button } from '@salesforce/design-system-react'

const CitySelector = (props) => {
    const [selectedButton, setSelectedButton] = useState()
    const { citySelected } = props;
    const { cities } = props;
    
    if (!cities) {
        return <div>No cities available to select.</div>
    }

    function cityClicked(city, index) {
        citySelected(city)
        setSelectedButton(index)
        
    }

    return (
        <div className="slds-align_absolute-center">
            {cities.map((city, index) => (
                <Button variant={index === selectedButton ? "outline-brand" : "neutral"} 
                    key={index} onClick={() => {cityClicked(city, index)}}
                >
                    {city.name}
                </Button>
            ))}
        </div>
    )
}

export default CitySelector;