const geocode = require("../utils/mapbox")
const weatherstack = require("../utils/weatherstack")
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

app.set('views', viewsPath)
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
app.set("view engine", "hbs")
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eren'
    })
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Weather App',
        name: 'Eren'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Eren'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: "Turkiye",
        sicaklik: 8
    })
})
app.get("*splat", (req, res) => {
    res.render("404",{
        title: "404",
        name: "Eren",
        errorMessage: "404 help sayfasi bulunamadi"
    })
})

geocode('Bursa', (error, {latitude, longitude, location} = {}) => {
    if(error){
        console.log("Error: ", error)
    }else{
        console.log("Location: ", location)
        console.log("Coordinates: ", latitude, longitude)

        weatherstack(latitude, longitude, (error, {sicaklik, hava, feelslike} = {}) => {
            if(error){
                console.log("Weather error: ", error)
            }else{
                console.log("Weather Data: ")
                console.log("Sıcaklık: ", sicaklik)
                console.log("Hava: ", hava)
                console.log("Hissedilen: ", feelslike)
            }
        })
    }
})