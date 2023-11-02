var express = require("express");
var router = express.Router();
const carsCtrl = require("../controllers/cars");

router.get('/new',carsCtrl.new);

router.post('/', carsCtrl.create);

router.get('/', carsCtrl.index)

router.get('/:id', carsCtrl.show)

router.delete('/:id',carsCtrl.delete)

router.put('/:id',carsCtrl.update)

module.exports=router;