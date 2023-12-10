const express = require('express');
const router = express.Router();
const parfumesService = require('./parfumes.service');
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');



router.post('/add', addSchema, add);
router.get('/getAll', getAll);
router.get('/:id', getById);
router.get('/getAllTypes',getAllTypes)

module.exports = router;


function addSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        company: Joi.string(),
        type: Joi.string(),
        img: Joi.string(),
        
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    console.log(req.body)
    parfumesService.add(req.body, req.get('origin'))
        .then(() => res.json({ message: 'add successful' }))
        .catch(next);
}


function getAll(req, res, next) {
    parfumesService.getAll()
    .then(accounts => res.json(accounts))
    .catch(next);
    
}

function getById(req, res, next) {
console.log("from getByID")
    parfumesService.getById(req.params.id)
        .then(account => account ? res.json(account) : res.sendStatus(404))
        .catch(next);

}

function getAllTypes(req, res, next) { 
    parfumesService.getAllTypes()
    .then(accounts => res.json(accounts))
    .catch(next);
}
