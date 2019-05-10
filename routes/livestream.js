let express = require('express');
let controller=require('../controllers/livestream');
let router=express.Router();

router.get('/',controller.livestream);

module.exports=router;