const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const patentName = req.body.patent;
    const options = {
        method: 'GET',
        url: 'https://global-patent1.p.rapidapi.com/s',
        params: {ds: 'all', q: patentName},
        headers: {
          'X-RapidAPI-Key': '8179863635msh3d078fd9bb291b8p1d8552jsn10a00a123e77',
          'X-RapidAPI-Host': 'global-patent1.p.rapidapi.com'
        }
      };
      
    axios.request(options).then(function (response) {
        const patentData = response.data.patents;
        res.write("<h1>Search Results For Patent : "+patentName);
        for (let i = 1; i <= patentData.length; i++) {
            const patentItem = patentData[i-1];
            res.write("<h2>Result No. "+i+"\n\n");
            res.write("<h4>Application Date Of Patent : "+patentItem.applicationDate);
            res.write("<h4>Application Number Of Patent : "+patentItem.applicationNumber);
            res.write("<h4>ID Of Patent : "+patentItem.id+"\n\n");    
        }
    }).catch(function (error) {
        console.error(error);
    });
});

app.listen(3000, function(){
    console.log("Server has started listening on port 3000");
})