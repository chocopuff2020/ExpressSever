var express = require('express');
var app = express();
var PORT = 3000;


/*==================================
=            Middleware            =
==================================*/
//It's IMPORTANT to start the middleware uptop before you do anythign else
//There are 2 types of middleware: "app level" and "route level" middle ware. This bellow is "route level"
//if the user is logged in, you call call "next" to run the "route specific" functions
//if you never call next, you can send back an error and the use wont' be access the private info

var middleware = {
    requireAuthentication: function(req,res,next) {
        console.log('Private route hit!');
        next();
    },
    logger: function(req,res,next) {
        var time = new Date().toString();
        console.log('Request: '+ time + ' ' + req.method + '' + req.originalUrl); //log the root of our page
        next();
    }
}
//When calling app.use --> we are adding "application level" middleware. It's gonna get called for every page 
//requested and every route hit
app.use(middleware.logger);

/*=====  End of Middleware  ======*/



app.get('/about',middleware.requireAuthentication,function (req, res) {
  res.send('About Us')
})

//IMPORTANT LINE: it tells the server which folder to serve. Express.static(__dirname + '/foldername')
app.use(express.static(__dirname + '/public'));


app.listen(PORT, function() {
    console.log('Express server started on PORT '+ PORT +'...');
});