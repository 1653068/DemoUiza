let express = require("express");
let controller = require("../controllers/livestream");
let router = express.Router();

router.get("/", controller.livestream);
router.get("/event", controller.getCreateEvent);
router.post("/event", controller.postCreateEvent);
router.get("/recodedFiles", controller.listRecordFile);
router
  .route("/event/:id")
  .get(controller.retrieveLivestream)
  .post(controller.startLivestream)
  .put(controller.stopLivestream)
  .delete(controller.deleteLivestream);

// router.delete("/event/delete/:id?_method=DELETE",controller.deleteLivestream);
router.get("/playlivestream/:id", controller.playALivestream);

module.exports = router;
