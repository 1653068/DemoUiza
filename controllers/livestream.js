const Uiza = require("uiza");
let controller = {};

controller.livestream = (req, res) => {
  res.locals.active = 3;
  res.render("livestream/livestream");
};

module.exports = controller;
