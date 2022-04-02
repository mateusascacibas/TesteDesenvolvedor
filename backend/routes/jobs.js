const express = require('express');

const jobController = require('../controllers/job');

const router = express.Router();

//router.get('/', jobController.getAllJob);

router.get('/', jobController.listarJobs);

router.get('/:id', jobController.listId);

router.post('/', jobController.postJob);

router.put('/:id', jobController.putJob);

module.exports = router;
