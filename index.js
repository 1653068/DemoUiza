var express = require("express");
var app = express();
var open = require("open");
let hbs = require("express-handlebars");
var paginate = require("express-handlebars-paginate");
const methodOverride = require("method-override");
let bodyParser = require("body-parser");
let morgan = require("morgan");
const uiza = require("uiza");
let handlebarsHelper = require("./controllers/handlebarHelper");
const { ApiKey } = require("./config/config.json");

app.use(morgan("dev"));
uiza.authorization(ApiKey);
app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    helpers: {
      paginate: paginate.createPagination
    }
  })
);

app.set("view engine", "hbs");
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.set("port", process.env.PORT || 5000);

let homeRoute = require("./routes/home");
app.use("/", homeRoute);
let entityRoute = require("./routes/entity");
app.use("/entity", entityRoute);
let categoryRoute = require("./routes/category");
app.use("/category", categoryRoute);
let livestreamRoute = require("./routes/livestream");
app.use("/livestream", livestreamRoute);
// let userManagementRoute = require('./routes/userManagement');
// app.use('/userManagement', userManagementRoute);

app.listen(app.get("port"), function() {
  console.log("server is  listening on port " + app.get("port"));
  open("http://localhost:5000/");
});
