const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=c8e2c93ef2dbdb0c97d5aa831c55635d&units=metric";
    https.get(url,function(resp){
        resp.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            res.write("<h1>The temperature in "+query+" is "+temp+" degrees.<h1>");
            res.write("<h3>The weather is "+desc+".</h3>");
            res.send;
            });
    })
})


app.listen("3000",function(){
    console.log("started");
})