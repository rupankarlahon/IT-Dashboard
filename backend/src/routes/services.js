const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/serviceController');
const { validateService } = require('../middleware/validation');

const serviceController = new ServiceController();

router.get('/', serviceController.getServices);
router.post('/', validateService, serviceController.addService);
router.delete('/:id', serviceController.deleteService);
router.put('/:id', validateService, serviceController.updateService);

module.exports = router;