const express = require("express");//Here we have downloaded a package called express through npm and we are going to requier it.
const http = require("https");//here its in a native node package that comes with node it is used to send get request to apis and fetch data from them
const bodyParser = require("body-parser");
const app = express();// we are intalizind app to express function it helps us to use all the methods that comes with express
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/index.html");

});
  app.post("/", (req, res) => {
  const city = req.body.userCity;
  const apiId = "c78d9828c67e3fb14096a408ce2f50f7"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiId + "&units=" + unit;
  http.get(url, (responseapi) => {//here we are sending a get request to the external server(api) usig a method called.get that  takes a url of the api and a callback function that acts when the data ifs fetched from the api.
    console.log(responseapi.statusMessage);

    responseapi.on("data", (data) => {
      const datafetched = JSON.parse(data);
      const cod = datafetched.cod;
      if (cod == "404") {
        res.send("<h1>Please enter a valid city name.</h1>")
      }
      else{
      const temprature = datafetched.main.temp;
      const weatherDescription = datafetched.weather[0].description;
      const icon = datafetched.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.send("<h1>The temprature in "+ city + " is " + temprature + " degree celcius.</h1><br>" + "<h2>The weather seems like " + weatherDescription
        + "<br><img src=" + iconUrl + ">");
      }
    });
  });
  });

  //here the on is a method that we are able to use on the the response parameter we got from making the http
  // get request  this parameter holds the response we are gettting from the api.
  //now using on it is basically like event listner  that when the api sends back the data it check the data
  // comming back anhd calls a callback function  which takes 1 parameter that is the data recived.
  //and the const called data fetched hols all the data the api gave us back cause the parameter data
  //contains it we are intializing the data with a constant and the data is in hex so we are using JSON parse
  //which converts the data to js objects. and now we are console loggging the datafetched .main.temp 
  //continue:- which contains the temmprature property present in object called main that is present in
  //an other object called datafetched.
  //    });


  // });

  app.listen(3000, () => {
    console.log("Server hosted locally");
  });

