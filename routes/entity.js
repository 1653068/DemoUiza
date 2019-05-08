let express = require('express');
let router = express.Router();
let controller = require('../controllers/entity');

router.get('/', controller.entityList);
router.get('/:id', controller.viewEntity);
module.exports = router;