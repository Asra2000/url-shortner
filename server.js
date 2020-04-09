const express = require("express");
const mongoose = require("mongoose");
const ShortUrl  = require('./models/shortURL.js');
var app = express();

mongoose.connect('mongodb://localhost/urlShotener',{
    //some set up options
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}))

app.get("/", async(req, res)=>{
    const shorturls = await ShortUrl.find()
    // console.log(shorturls);
    res.render("index", {shorturls: shorturls});
});

app.post("/shortUrls", async(req, res)=>{
    console.log(req.body.fullUrl);
await ShortUrl.create({full: req.body.fullUrl});

res.redirect("/");
});

app.get("/:shorturl", async(req, res)=>{
    const shorturl = await ShortUrl.find({short: req.params.shorturl})
    console.log(shorturl)
    if(shorturl == null)
    res.sendStatus(404);
    shorturl.clicks++
    shorturl.save((err, url)=>{
        if(!err)
        console.log(url);
    })
    console.log("hi")
    console.log(shorturl)
    res.redirect(shorturl.full)
})

app.listen(process.env.PORT||3000);