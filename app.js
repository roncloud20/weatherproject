const express = require('express'); // Imports the express module
const https = require('https'); // Imports the https module

const app = express(); // Initializes the express instance

app.get('/', (req, res) => {

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=33fe1fb24000457d83c9f587d21300ce&q=tokyo&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>The weather in Lagos is ${temp} <sup>o</sup>C, ${weatherDescription}</h1>`);
            res.write(`<img src='${iconURL}'/>`);
            res.send();
        })
    });
    // res.send("Welcome");
});



app.listen(3000, function() {
    console.log('listening on port 3000');
});