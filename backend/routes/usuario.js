const express = require('express');

const usuarioController = require('../controllers/usuario');

const router = express.Router();

//router.get('/', usuarioController.getAllUser);

router.get('/', usuarioController.listarUsers);

router.get('/:id', usuarioController.listId);

router.post('/', usuarioController.postUser);

router.put('/:id', usuarioController.putUser);

router.delete('/:id', usuarioController.deleteUser);

module.exports = router;
