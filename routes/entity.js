let express = require('express');
let router = express.Router();
let controller = require('../controllers/entity');

router.get('/', controller.entityList);
router.get('/:id', controller.viewEntity);
router.get('/create', controller.createEntity);
router.get('/update', controller.updateEntity);
router.get('/delete', controller.deleteEntity);

module.exports = router;