var express = require('express');
var app = express();
let hbs = require('express-handlebars');
let bodyParser = require('body-parser');
let https = require('https');
let http = require('http');
let path = require('path');
let fs = require('fs');
let morgan = require('morgan');
const uiza = require('uiza');
var Handlebars = require('handlebars');
var MomentHandler = require("handlebars.moment");
var paginate = require('express-handlebars-paginate');

MomentHandler.registerHelpers(Handlebars);

Handlebars.registerHelper("inc", function (value, options) {
    return parseInt(value) + 1;
});


app.use(morgan('dev'));
uiza.authorization('uap-a92a4506195d429b8bd992abfa7b93e0-efbeefc1');
app.use(express.static(__dirname + "/public"));

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        paginate: paginate.createPagination
    }
}));

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('port', process.env.PORT || 5000);

let homeRoute = require('./routes/home');
app.use('/', homeRoute);
let entityRoute = require('./routes/entity');
app.use('/entity', entityRoute);
let categoryRoute = require('./routes/category');
app.use('/category', categoryRoute);
let livestreamRoute = require('./routes/livestream');
app.use('/livestream', livestreamRoute);
// let userManagementRoute = require('./routes/userManagement');
// app.use('/userManagement', userManagementRoute);

Handlebars.registerHelper('ifTypes', function (v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.listen(app.get("port"), function () {
    console.log("server is  listening on port " + app.get("port"));
});