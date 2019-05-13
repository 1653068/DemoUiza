let express = require("express");
let controller = require("../controllers/livestream");
let router = express.Router();

router.get("/", controller.livestream);
router.get("/createEvent", controller.getCreateEvent);
router.post("/createEvent", controller.postCreateEvent);

module.exports = router;
