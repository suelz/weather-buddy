const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'https://api.darksky.net/forecast/e2f49c6af94ff606223c5d872f1fb24c/' + lat + ',' + long

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            const temp = JSON.stringify(body.currently.temperature)
            const rain = JSON.stringify(body.currently.precipProbability)
            callback(undefined, body.daily.data[0].summary + " It is currently " + temp + " degrees out. The high is " + body.daily.data[0].temperatureHigh + " with a low of " + body.daily.data[0].temperatureLow + ". There is a " + rain + "% chance of rain")
        }
    })
}

module.exports = forecast

