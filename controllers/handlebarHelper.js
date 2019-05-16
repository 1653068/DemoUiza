var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
let handlebarsHelper = {};

MomentHandler.registerHelpers(Handlebars);

handlebarsHelper.inc = Handlebars.registerHelper("inc", (value, options) => {
  return parseInt(value) + 1;
});

handlebarsHelper.ifTypes = Handlebars.registerHelper(
  "ifTypes",
  (v1, v2, options) => {
    if (v1 == v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  }
);

handlebarsHelper.json = Handlebars.registerHelper("json", content => {
  return JSON.stringify(content);
});

module.exports = handlebarsHelper;
