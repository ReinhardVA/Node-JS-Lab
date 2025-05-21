const request = require('postman-request')
require("dotenv").config()

const apiKey = process.env.MAPBOX_KEY

const geocode = (address, callback) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`

    request({ url: geoURL, json: true}, (error, response, {features} = {}) => {
        if(error){
            callback("Bağlantı hatası", undefined)
        } else if(features.length === 0){
            callback("URL hatası", undefined)
        } else{
            const {text: location} = features[0];
            const [longitude, latitude] = features[0].geometry.coordinates;

            callback(undefined, {location, longitude, latitude});
        }
    })
}

module.exports = geocode