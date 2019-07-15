import React from 'react';
import moment from 'moment';
import { Card } from '@salesforce/design-system-react';
import { getWeatherIconUrl } from '../../../services/WeatherService'

const retrieveDegreeInText = (degree) => {
    if (degree >= 355 && degree <= 5) {
        return 'N'
    } else if (degree >= 6 && degree <= 84) {
        return 'NE'
    } else if (degree >= 85 && degree <= 95) {
        return 'E'
    } else if (degree >= 96 && degree <= 174) {
        return 'SE'
    } else if (degree >= 175 && degree <= 185) {
        return 'S'
    } else if (degree >= 186 && degree <= 264) {
        return 'SW'
    } else if (degree >= 265 && degree <= 275) {
        return 'W'
    } else if (degree >= 276 && degree <= 354) {
        return 'NW'
    }
}

const unixDateTimeToTime = (unixTimeUtc) => {
    var day = moment.unix(unixTimeUtc).format("LT")
    return day
}

const CurrentForecast = (props) => {
    const { weather, main, wind, clouds, rain, snow, sys } = props.currentForecast
    function toUpperCaseFirstLetters(stringToTransform) {
        return stringToTransform.toLowerCase()
                .split(' ')
                .map((string) => string.charAt(0).toUpperCase() + string.substring(1))
                .join(' ');
    }
    return (
        <div className="slds-m-horizontal_xx-large">
            <div className="slds-text-heading_medium">Current Forecast</div>
            <Card heading={"Today, " + moment().format("dddd, MMMM Do")} >
                <div className="slds-card__body slds-card__body_inner slds-grid slds-wrap">
                    <div className="slds-col slds-size_3-of-12">
                        <p className="slds-text-heading_small">{toUpperCaseFirstLetters(weather[0].description)}</p>
                        <img src={getWeatherIconUrl(weather[0].icon)} alt="Weather Icon"></img>
                    </div>
                    <div className="slds-col slds-size_3-of-12 ">
                        <div className="slds-text-heading_small">Temperature</div>
                        <div className="slds-text-body_small">
                            <p>Current Temperature: {main.temp} &#176;F</p>
                            <p>Temperature Min: {main.temp_min} &#176;F</p>
                            <p>Temperature Max: {main.temp_max} &#176;F</p>
                        </div>
                    </div>
                    <div className="slds-col slds-size_3-of-12">
                        <div className="slds-text-heading_small">Air</div>
                        <div className="slds-text-body_small">
                            <p>Humidity: {main.humidity}%</p>
                            <p>Wind Speed: {wind.speed} Mph</p>
                            <p>Wind Degree: {retrieveDegreeInText(wind.deg)} ({wind.deg}&#176;)</p>
                        </div>
                    </div>
                    <div className="slds-col slds-size_3-of-12">
                        <div className="slds-text-heading_small">Sky</div>
                        <div className="slds-text-body_small">
                            <p>Cloudiness: {clouds.all}%</p>
                            <p>Sunrise: {unixDateTimeToTime(sys.sunrise)}</p>
                            <p>Sunset: {unixDateTimeToTime(sys.sunset)}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CurrentForecast;