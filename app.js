const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const stringSimilarity = require("string-similarity");


const shaders = [
    { shaderName: "wood" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "glass" },
    { shaderName: "rubber" },
    { shaderName: "metal" },

    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" },
    { shaderName: "rubber" },
    { shaderName: "metal" }
];

//setting static folder for server
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//setting up view engine as ejs
app.set("view engine", "ejs");

//setting up body parser
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.listen(3000, function () {
    console.log("Server started at 3000");
});

app.get("/", function (req, res) {
    res.render("index", { shaders: shaders });
});

app.get("/shaders", function (req, res) {
    var shader = {
        shaderName: req.query.shaderName
    };

    ejs.renderFile("views/shader.ejs", { shader: shader }, function (err, str) {
        if (err) {
            console.log("err:\n" + err);
        }
        else {
            // console.log("Html string:\n"+str);
            res.send(str);
        }
    });

});

app.get("/photos", function (req, res) {
    // console.log("Reached photos");
    var shader = {
        shaderName: req.query.shaderName
    };

    // console.log(shader.shaderName);
    var filePath = path.join(__dirname, "public", "images", "actual", shader.shaderName + ".png")
    res.sendFile(filePath);
});

app.get("/download", function (req, res) {

    console.log("Completely here");
    var shader = {
        shaderName: req.query.shaderName
    };

    var filePath = path.join(__dirname, "public", "blenderFiles", shader.shaderName + ".blend");
    console.log("pathToFile : \n" + filePath);

    res.download(filePath, "metal.zip", function (err) {
        console.log("downlong eer:\n" + err);
    });
});

app.post("/search", function (req, res) {
    const searchItem = req.body.searchInput + "";
    const selectedShaders = [];

    shaders.forEach(shader => {
        const compare = stringSimilarity.compareTwoStrings(shader.shaderName, searchItem);
        if (compare > 0.1) {
            selectedShaders.push(shader);
        }
    });

    res.render("index", { shaders: selectedShaders });
});