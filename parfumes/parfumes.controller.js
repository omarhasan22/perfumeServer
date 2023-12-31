const express = require('express');
const router = express.Router();
const parfumesService = require('./parfumes.service');
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')


router.post('/add', addSchema, add);
router.post('/charge', authorize() , charge);
router.get('/getTypes', getAllTypes);
router.get('/getType/:company', getByType);
router.get('/getAll', getAll);
router.get('/:id', getById);
router.get('/A/:id', getByIdA);



module.exports = router;


function addSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string(),
        company: Joi.string(),
        type: Joi.string(),
        price: Joi.number(),
        img: Joi.string(),
        
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    parfumesService.add(req.body, req.get('origin'))
        .then(() => res.json({ message: 'add successful' }))
        .catch(next);
}

function charge(req, res, next) {
    console.log(req.body)
    parfumesService.charge(req.body)
        .then(() => res.json({ message: 'add successful' }))
        .catch(next);
}


function getAll(req, res, next) {
    parfumesService.getAll()
    .then(accounts => res.json(accounts))
    .catch(next);
    
}

function getById(req, res, next) {
    parfumesService.getById(req.params.id)
        .then(account => account ? res.json(account) : res.sendStatus(404))
        .catch(next);
}

function getByIdA(req, res, next) {
    parfumesService.getById(req.params.id)
    .then(accounts => res.json(accounts))
    .catch(next);
}

function getAllTypes(req, res, next) {
    parfumesService.getAllTypes()
    .then(perfumes => res.json(perfumes))
    .catch(next);
}

function getByType(req, res, next) {
    parfumesService.getByType(req.params.company)
        .then(account => account ? res.json(account) : res.sendStatus(404))
        .catch(next);

}
