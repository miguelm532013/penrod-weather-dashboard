import React, { useState } from 'react';
import moment from 'moment'
import { Card, Accordion, AccordionPanel } from '@salesforce/design-system-react';
import { getWeatherIconUrl } from '../../../services/WeatherService'

const unixToDate = (unixDateTime) => {
    var unixDateTimeConverted = moment.unix(unixDateTime)
    var todayPrefix = ''
    if (moment().isSame(unixDateTimeConverted, 'day')) {
        todayPrefix = 'Today, '
    }
    return todayPrefix + unixDateTimeConverted.format("dddd, MMMM Do")
}

const unixToTime = (unixDateTime) => {
    return moment.unix(unixDateTime).format("hh:mm A")
}

const organizeForecastByDays = (unorganizedForecasts) => {
    var organizedForecasts = new Map()
    unorganizedForecasts.forEach(unorganizedForecast => {
        var keyDate = moment.unix(unorganizedForecast.dt).format("ll")
        if (!organizedForecasts.has(keyDate)) {
            organizedForecasts.set(keyDate, [])
        }
        organizedForecasts.get(keyDate).push(unorganizedForecast);
        
    })
    return organizedForecasts
}

const FutureForecast = (props) => {
    const [toggledPanels, setToggledPanels] = useState([])
    const forecasts = props.futureForecast.list

    function getRain(dayForecast) {
    if (dayForecast.rain && dayForecast.rain["3h"]) {
            return (<p className="slds-align_absolute-center">Estimated Rain: {dayForecast.rain["3h"]} mm</p>)
        }
    }
    function getSnow(dayForecast) {
        if (dayForecast.snow && dayForecast.snow["3h"]) {
            return (<p className="slds-align_absolute-center">Estimated Snow: {dayForecast.snow["3h"]}</p>)
        }
    }
    function togglePannel(panelId) {
        var newToggledPanels = []
        var indexOfPanelId = toggledPanels.indexOf(panelId)
        if (indexOfPanelId > -1) {
            newToggledPanels = toggledPanels.slice(0, indexOfPanelId).concat(toggledPanels.slice(indexOfPanelId + 1, toggledPanels.length))
        } else {
            newToggledPanels = toggledPanels.concat([panelId])
        }
        setToggledPanels(newToggledPanels)
    }
    
    var forecastByDays = organizeForecastByDays(forecasts)
    return (
        <div className="slds-m-top_large">
            <div className="slds-text-heading_medium">Future Forecast</div>
            <div className="slds-grid slds-gutters">
                {[...forecastByDays].map((keyValue, i) => { return (
                    <div className="slds-col" key={i}>
                        <Card heading={unixToDate(keyValue[1][0].dt)}>
                            <Accordion>
                                {keyValue[1].map((forecast, j) => { return (
                                        <AccordionPanel
                                            key={j + forecast.main.temp}
                                            expanded={toggledPanels.includes(`${i}${j}`)}
                                            id={`${i}${j}`}
                                            onTogglePanel={() => {togglePannel(`${i}${j}`)}}
                                            summary={`${unixToTime(forecast.dt)} - ${forecast.main.temp} F`}
                                        >
                                            <div>
                                                <img className="slds-align_absolute-center" src={getWeatherIconUrl(forecast.weather[0].icon)} alt="Weather Icon"></img>
                                                <div className="slds-text-body_small">
                                                    <p className="slds-align_absolute-center">Low: {forecast.main.temp_min} &#176;F</p>
                                                    <p className="slds-align_absolute-center">High: {forecast.main.temp_max} &#176;F</p>
                                                    <p className="slds-align_absolute-center">Humidity: {forecast.main.humidity}%</p>
                                                    {getRain(forecast)}
                                                    {getSnow(forecast)}
                                                </div>
                                            </div>
                                        </AccordionPanel>
                                )})}
                            </Accordion>
                        </Card>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default FutureForecast;