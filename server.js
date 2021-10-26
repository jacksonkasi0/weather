const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/weather", (req, res) => {
  const city = req.body.city;
  const API = "64f249d36e98200d68396e142bde4b0c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;

 

  var ress = https.get(url, (response) => {
    response.on("data", (data) => {
      let Weather = JSON.parse(data);

      // res.send(Weather)
      res.render("result", {
        City: Weather.name,
        Discription: Weather.weather[0].description,
        Temp: Weather.main.temp,
        TempMax: Weather.main.temp_max,
        TempMin: Weather.main.temp_min,
        WindSpeed: Weather.wind.speed,
        Humidity: Weather.main.humidity,
        Img: `https://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`,
      });
    });
  });



});

app.listen(PORT, () => {
  console.log("server is running");
});
