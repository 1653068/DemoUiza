const Uiza = require("uiza");
let controller = {};

controller.entityList = (req, res) => {
  Uiza.entity
    .list()
    .then(list => {
      res.locals.active = 1;
      res.locals.entityList = list;
      res.render("entity/listEntity");
    })
    .catch(err => {
      res.send(err);
    });
};

controller.viewEntity = (req, res) => {
  var params = {
    id: req.params.id
  };

  Uiza.entity
    .retrieve(params)
    .then(entity => {
      res.locals.entity = entity;
      res.locals.active = 1;
      console.log(entity);
      res.render("entity/playAVideo");
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = controller;