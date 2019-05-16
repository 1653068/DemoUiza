let express = require("express");
let controller = require("../controllers/livestream");
let router = express.Router();

router.get("/", controller.livestream);
router.get("/createEvent", controller.getCreateEvent);
router.post("/createEvent", controller.postCreateEvent);
router.get("/listRecodedFiles", controller.listRecordFile);
router.get("/:id", controller.retrieveLivestream);
router.post(":/id", controller.startLivestream);
router.put(":/id", controller.stopLivestream);

module.exports = router;
