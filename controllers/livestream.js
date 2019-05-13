const Uiza = require("uiza");
let controller = {};
let fs = require("fs");
const path = require("path");
const multer = require("multer");

//Set Storage engine
const storage = multer.diskStorage({
  destination: "./public/img/",
  filename: (req, file, cb) => {
    cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

//Init upload
const upload = multer({
  storage: storage
}).single("poster");

controller.livestream = (req, res) => {
  res.locals.active = 3;
  res.render("livestream/livestream");
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
        poster: req.file.path,
        thumbnail: req.file.path,
        linkStream: [req.body.linkStream],
        resourceMode: "single"
      };

      Uiza.live
        .create(param)
        .then(live => {
          let data = JSON.stringify(live);
          fs.writeFileSync(__dirname + "livestream.txt", data);
          console.log(live);
          console.log(req.file.path);
          res.redirect("/livestream/createEvent");
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
};

module.exports = controller;
