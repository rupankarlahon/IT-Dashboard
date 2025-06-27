const express = require('express');
const router = express.Router();
const ContractController = require('../controllers/contractController');
const { validateContract } = require('../middleware/validation');

const contractController = new ContractController();

router.get('/', contractController.getContracts);
router.post('/', validateContract, contractController.addContract);
router.delete('/:id', contractController.deleteContract);
router.put('/:id', validateContract, contractController.updateContract);

module.exports = router;