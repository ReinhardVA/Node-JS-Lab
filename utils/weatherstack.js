const request = require('postman-request')
require("dotenv").config()
const apiKey = process.env.WEATHERSTACK_KEY
const weatherstack = (latitude, longitude, callback) => {
    const weatherstackURL = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;

    request({ url: weatherstackURL, json: true }, (error, response, { error: forecastError, current}) => {
        if (error) {
            callback('Bağlantı Hatası', undefined);
        } else if (forecastError) {
            callback('URL hatası', undefined);
        } else {
            const { temperature: sicaklik, feelslike, weather_descriptions } = current;
            const hava = weather_descriptions[0];

            callback(undefined, {
                sicaklik,
                hava,
                feelslike
            });
        }
    });
};

module.exports = weatherstack