const express = require('express');
const router = express.Router();
const model = require('../models/gum-models.js');

router.get('/', model.getAllGums);

router.get('/:id', model.getOneGum);

router.post('/', model.createGum);

router.put('/:id', model.updateGumPUT);

router.patch('/:id', model.updateGumPATCH);

router.delete('/:id', model.deleteGum);

module.exports = router;
