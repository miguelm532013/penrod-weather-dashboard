import React, { useState, useEffect } from 'react';
import CurrentForecast from './current/CurrentForecast';
import FutureForecast from './future/FutureForecast';
import { getCurrentForecast, getFutureForecast } from '../../services/WeatherService'
import { Spinner } from '@salesforce/design-system-react'

const Weather = (props) => {
    const [ currentForecast, setCurrentForecast ] = useState({isLoading: true})
    const [ futureForecast, setFutureForecast ] = useState({isLoading: true})
    const { city } = props;
    useEffect(() => {
        if (!city) {
            return;
        }
        getCurrentForecast(city.zipCode).then(result => {
            setCurrentForecast(result.data)
        })
        getFutureForecast(city.zipCode).then(result => {
            setFutureForecast(result.data)
        })
        return () => {
            setCurrentForecast({isLoading: true})
            setFutureForecast({isLoading: true})
        }
    }, [city])

    if (!city) {
        return (
            <div className="slds-text-font_monospace slds-text-heading_small 
                    slds-align_absolute-center slds-m-top_medium">
                Please Select a City
            </div>
        )
    } 
    if (!currentForecast || !futureForecast || currentForecast.error || futureForecast.error) {
        return (<div>Error retrieving weather</div>)
    }
    if (currentForecast.isLoading || futureForecast.isLoading) {
        return (<Spinner size="large"></Spinner>)
    }

    return (
        <div>
            <div className="slds-text-heading_large slds-align_absolute-center slds-m-top_large">
                Weather For {`${city.name}, ${city.stateAbbreviation}`} 
            </div>
            <CurrentForecast currentForecast={currentForecast} />
            <FutureForecast className="" futureForecast={futureForecast}/>
        </div>
    )
}

export default Weather;