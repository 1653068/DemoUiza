const Uiza = require("uiza");
let controller = {};

controller.categoryList = (req, res) => {
  Uiza.category
    .list()
    .then(list => {
      res.locals.active = 2;
      res.locals.categoryList = list;
      res.render("category/categoryList");
    })
    .catch(err => {
      res.json(err);
    });
};

controller.categoryListVideo = (req, res) => {
  Uiza.entity
    .list({
    //   //   where: {
    //   metadataId: req.params.id
    //   //   }
    })
    .then(eList => {
      res.locals.active = 2;
      var entity = eList.fillter(item => {
        return item.metadataId == req.params.id;
      });

      res.locals.listVideo = entity;
      res.render("category/categoryListVideo");
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = controller;
