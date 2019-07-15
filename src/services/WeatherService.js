import axios from 'axios'

const appId = 'fbeda3760a7adf058810137536c706c3'
const baseDataApiUrl = '/data/2.5'
const baseImgApiUrl = '/img/w'

export const getCurrentForecast = async (cityZipCode) => {
    try {
        const data = await axios.get(`${baseDataApiUrl}/weather?zip=${cityZipCode},us&units=imperial&APPID=${appId}`)
                                    .then(result => { return result.data })
        return { data, success: true };
    } catch (error) {
        return {error, success: false}
    }
}

export const getFutureForecast = async (cityZipCode) => {
    try {
        const data = await axios.get(`${baseDataApiUrl}/forecast?zip=${cityZipCode},us&units=imperial&APPID=${appId}`)
                                    .then(result => { return result.data })
        return { data, success: true };
    } catch (error) {
        return {error, success: false}
    }
}

export const getWeatherIconUrl = (iconId) => {
    var requestUrl = `${baseImgApiUrl}/${iconId}.png?APPID=${appId}`
    return requestUrl
}