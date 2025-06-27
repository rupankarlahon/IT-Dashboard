const express = require('express');
const router = express.Router();
const NetworkController = require('../controllers/networkController');

const networkController = new NetworkController();

router.post('/', networkController.addNetwork);
router.get('/', networkController.getNetworks);
router.delete('/:id', networkController.deleteNetwork);
router.put('/:id', networkController.updateNetwork);

module.exports = router;