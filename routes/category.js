let express = require('express');
let router = express.Router();
let controller = require('../controllers/category');

router.get('/', controller.categoryList);
router.get('/:id',controller.categoryListVideo);

module.exports = router;