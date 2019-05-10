const Uiza = require("uiza");
let controller = {};

controller.homepage = (req, res) => {
  Uiza.entity
    .list()
    .then(elist => {
      let page = req.query.page || 1;
      let pageLimit = 4;
      let offset = (page - 1) * pageLimit;

      let pagination = {
        page: parseInt(page),
        limit: pageLimit,
        totalRows: elist.length
      };

      if (elist.length != 0) res.locals.pagination = pagination;
      elist = elist.slice(offset, offset + pageLimit);
      res.locals.active = 0;
      res.locals.entityList = elist;
      res.locals.size = elist.length;
      res.render("home/index");
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = controller;
