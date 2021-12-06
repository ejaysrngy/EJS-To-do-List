const express = require("express");
const https = require("https");
const mongoose = require("mongoose");


app = express();

let newToDos = [];

app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todoList", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model(
    "Item",
    itemsSchema
);

let item1 = new Item ({
    name: "Welcome to your To-do List"
});

let item2 = new Item ({
    name: "Press the plus sign to add"
});

let item3 = new Item ({
    name: "Tick the box to delete"
});

let defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
    if (!err) {
        console.log("Success");
    } else {
        console.log(err)
    }
});

app.use(express.static("directory"));

app.get('/', function(req, res){
    // ** WEATHER APP
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
    // ^^ WEATHER APP

    Item.find({}, function(err, foundItems) {
        console.log(foundItems);
    });


    res.render("index", {kindOfDay: day, newItem: newToDos, weatherToday: weather});

        });
    }); 
});

app.post('/', function(req, res){
    let newToDo = req.body.newItem;

    newToDos.push(newToDo);

    res.redirect("/");
});

app.listen(3000);