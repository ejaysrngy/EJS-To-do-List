const express = require("express");
const https = require("https");

app = express();

let newToDos = [];
let weather = ''

app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs");

app.use(express.static("directory"));

app.get('/', function(req, res){
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=93cb7cc9e2692179b1f1a07a205ad4fd"

    https.get(URL, function(response){

        response.on("data", function(data){
            let weatherData = JSON.parse(data);
            let weather = weatherData.weather[0].description;

        

    let today = new Date();
    let day = ''
    let options = {
        weekday:'long',  
        month:'long', 
        day:'numeric'
    }

    if (today.getDay() === 6 || today.getDay() === 0) {
        day = today.toLocaleDateString("en-US", options)

    } else {
        day = today.toLocaleDateString("en-US", options)
    }
    res.render("index", {kindOfDay: day, newItem: newToDos, weatherToday: weather});

        });
    }); 
});

app.post('/', function(req, res){
    let newToDo = req.body.newItem;

    newToDos.push(newToDo);

    res.redirect("/");
});

app.listen(process.env.PORT || 5000);
