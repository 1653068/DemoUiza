const Uiza = require("uiza");
let controller = {};
let fs = require("fs");
const path = require("path");
const multer = require("multer");
const { AppId } = require("../config/config.json");

controller.livestream = (req, res) => {
  res.locals.active = 3;
  Uiza.live
    .retrieve()
    .then(liveList => {
      res.locals.livestreamList = liveList;
      // console.log("TCL: controller.livestream -> liveList", liveList);
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
      console.log("TCL: controller.postCreateEvent -> live.id", param);
      res.redirect("/livestream/event/" + live.id);
    })
    .catch(err => {
      res.json(err);
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

controller.startLivestream = (req, res) => {
  const param = {
    id: req.body.id
  };

  Uiza.live
    .start_feed(param)
    .then(feed => {
      Uiza.live
        .retrieve(param)
        .then(live => {
          console.log("TCL: controller.startLivestream -> live", live);
          res.redirect(`/livestream/playlivestream/${live.id}`);
        })
        .catch(err => {
          console.log("TCL: controller.startLivestream -> err", err);
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
};

controller.stopLivestream = (req, res) => {
  const param = {
    id: req.body.id
  };
  Uiza.live
    .stop_feed(param)
    .then(live => {
      res.locals.stop_feed = live;
      // console.log("TCL: controller.stopLivestream -> live", live)
      res.redirect("livestream/");
    })
    .catch(err => {
      res.json(err);
    });
};

controller.deleteLivestream = (req, res) => {
  var param = {
    id: req.params.id
  };
  console.log("TCL: controller.deleteLivestream -> param", param);
  Uiza.live
    .delete(param)
    .then(live => {
      console.log("TCL: controller.deleteLivestream -> live", live);
      res.redirect("/livestream");
    })
    .catch(err => {
      res.json(err);
    });
};

controller.playALivestream = (req, res) => {
  var param = {
    id: req.params.id
  };
  var app = {
    id: AppId
  }
  console.log("TCL: controller.playALivestream -> param", param);

  Uiza.live
    .retrieve(param)
    .then(live => {
      res.locals.active = 3;
      res.locals.live = live;
      res.locals.AppId = app;
      console.log("TCL: controller.playALivestream -> live", live);
      res.render("livestream/playLivestream");
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = controller;
