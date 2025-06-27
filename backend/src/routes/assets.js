const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/assetController');
const { validateAsset } = require('../middleware/validation');

const assetController = new AssetController();

// Get all assets with optional filters
router.get('/', assetController.getAssets);

// Get asset statistics
router.get('/stats', assetController.getAssetStats);

// Get single asset by ID
router.get('/:id', assetController.getAssetById);

// Create new asset
router.post('/', validateAsset, assetController.addAsset);

// Update single asset
router.put('/:id', validateAsset, assetController.updateAsset);

// Bulk update assets
router.put('/bulk-update', assetController.bulkUpdateAssets);

// Delete asset
router.delete('/:id', assetController.deleteAsset);

module.exports = router;