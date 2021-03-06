'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Coffee = require('../models/Coffee.js');

const router = express.Router();

const coffeeList = new Coffee();

/**
 * @api {get} /coffee List all coffee types
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 * @apiSuccess {Object[]} coffee Coffee list
 * @apiSuccess {Number} coffee.id Coffee id
 * @apiSuccess {Number} coffee.producer_id Coffee profucer id
 * @apiSuccess {String} coffee.name Coffee name
 * @apiSuccess {String} coffee.description Coffee description
 * @apiSuccess {String} coffee.flavor_profile Coffee flavor profile
 * @apiSuccess {String} coffee.varieties Coffee varieties
 * @apiSuccess {Date} coffee.created_at Created date
 * @apiSuccess {Date} coffee.updated_at Updated date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *    [{
        "createdAt": "2017-06-23T14:56:16.000Z",
        "description": "Lorem ipsum",
        "flavorProfile": "Fruity, radiant, creamy",
        "id": 1,
        "name": "Three Africas",
        "producerId": 1,
        "updatedAt": "2017-06-23T14:56:16.000Z",
        "varieties": "Heirloom"
      }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/coffee', (req, res) => {
  coffeeList.getCoffee()
    .then(coffeeList => {
      res.send(coffeeList);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
 * @api {get} /coffee/:id Get coffee by id
 * @apiVersion 1.0.0
 * @apiGroup Coffee
 * @apiSuccess {Object[]} coffee Coffee object
 * @apiSuccess {Number} coffee.id Coffee id
 * @apiSuccess {Number} coffee.producer_id Coffee profucer id
 * @apiSuccess {String} coffee.name Coffee name
 * @apiSuccess {String} coffee.description Coffee description
 * @apiSuccess {String} coffee.flavor_profile Coffee flavor profile
 * @apiSuccess {String} coffee.varieties Coffee varieties
 * @apiSuccess {Date} coffee.created_at Created date
 * @apiSuccess {Date} coffee.updated_at Updated date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *    {
        "createdAt": "2017-06-23T14:56:16.000Z",
        "description": "Lorem ipsum",
        "flavorProfile": "Fruity, radiant, creamy",
        "id": 1,
        "name": "Three Africas",
        "producerId": 1,
        "updatedAt": "2017-06-23T14:56:16.000Z",
        "varieties": "Heirloom"
      }
* @apiErrorExample {json} Coffee object not found
*    HTTP/1.1 404 Not Found
* @apiErrorExample {json} Find error
*    HTTP/1.1 500 Internal Server Error
*/
router.get('/coffee/:id', (req, res) => {
  const id = req.params.id;
  coffeeList.getCoffeeById(id)
    .then(coffee => {
      if (coffeeList.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(coffee);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
