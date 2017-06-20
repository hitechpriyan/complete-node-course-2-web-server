const express = require('express');
const hbs = require('hbs');
const fs = require("fs");

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear() + 3;
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(error)=>{
        if(error){
            console.log("Unable to write to the log file.");
        }
    });
    next();
});

let maintenancePageValues = {
    pageTitle : 'Under Construction'
};

// app.use((req,res,next) => {
//     res.render('maintenance.hbs',maintenancePageValues);
//     next();
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
    //res.send("<h1>Hello Express!</h1>");
    res.send({
        name: 'jeya',
        likes: [
            'biking',
            'yoga'
        ]
    });
});

let abtPageValues = {
        pageTitle : 'About Page'
    };



app.get('/about', (req,res) => {
    //res.send("About Page");
    res.render('about.hbs',abtPageValues);
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage : "unable to reach the server"
    });
});

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
});