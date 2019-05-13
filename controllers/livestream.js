const Uiza = require("uiza");
let controller = {};
let fs = require("fs");
const path = require("path");
const multer = require("multer");

controller.livestream = (req, res) => {
  res.locals.active = 3;
  Uiza.live
    .retrieve()
    .then(liveList => {
      res.locals.livestreamList = liveList;
      res.render("livestream/livestream");
    })
    .catch(err => {
      res.json(err);
    });
};

controller.listRecordFile = (req, res) => {
  res.locals.active = 3;
  Uiza.live
    .list_recorded()
    .then(recordedList => {
      res.locals.recordedList = recordedList;
      res.render("livestream/listRecordFile");
    })
    .catch(err => {
      res.json(err);
    });
};

controller.getCreateEvent = (req, res) => {
  res.locals.active = 3;
  res.render("livestream/createEvent");
};

controller.postCreateEvent = (req, res) => {
  res.locals.active = 3;

  upload(req, res, err => {
    if (err) {
      res.render("livestream/createEvent", {
        msg: err
      });
    } else {
      const param = {
        name: req.body.name,
        mode: req.body.mode,
        encode: parseInt(req.body.encode, 10),
        dvr: parseInt(req.body.dvr, 10),
        description: req.body.description,
        poster: req.body.poster,
        thumbnail: req.body.poster,
        linkStream: [req.body.linkStream],
        resourceMode: "single"
      };

      Uiza.live
        .create(param)
        .then(live => {
          res.redirect("/livestream/createEvent");
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
};

controller.retrieveLivestream = (req, res) => {
  res.locals.active = 3;
  const param = {
    id: req.params.id
  };
  Uiza.live
    .retrieve(param)
    .then(live => {
      res.locals.retrieveLive = live;
      res.render("livestream/retrieveLivestream");
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = controller;
