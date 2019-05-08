let express = require('express');
let router = express.Router();
let controller = require('../controllers/home');

router.get('/', controller.homepage);

module.exports = router;