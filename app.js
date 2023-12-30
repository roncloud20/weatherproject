const express = require('express'); // Imports the express module
const https = require('https'); // Imports the https module
const bodyParser = require('body-parser'); // Imports the body-parser module

const app = express(); // Initializes the express instance

app.use(bodyParser.urlencoded({extented: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", (req,res) => {
    const city = req.body.cityName;
    const APIKey = '33fe1fb24000457d83c9f587d21300ce';
    const units = 'metric';

    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKey}&q=${city}&units=${units}`;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>The weather in ${city} is ${temp} <sup>o</sup>C, ${weatherDescription}</h1>`);
            res.write(`<img src='${iconURL}'/>`);
            res.send();
        })
    });
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});