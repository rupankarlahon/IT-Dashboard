const Asset = require('../models/asset');
const { Op, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

class AssetController {
    async addAsset(req, res) {
        try {
            console.log('Attempting to create asset with data:', req.body);
            
            
            const requiredFields = ['assetId', 'assetClass', 'inventoryNumber', 'makeModel', 'serialNumber'];
            const missingFields = requiredFields.filter(field => !req.body[field]);
            
            if (missingFields.length > 0) {
                console.error('Missing required fields:', missingFields);
                return res.status(400).json({
                    error: 'Missing required fields',
                    fields: missingFields
                });
            }

            const asset = await Asset.create(req.body);
            console.log('Asset created successfully:', asset.toJSON());
            res.status(201).json(asset);
        } catch (err) {
            console.error('Error creating asset:', {
                message: err.message,
                stack: err.stack,
                body: req.body
            });

            if (err.name === 'SequelizeUniqueConstraintError') {
                const field = err.errors[0].path;
                return res.status(400).json({
                    error: `${field} already exists`,
                    field: field
                });
            }

          
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    error: 'Validation error',
                    details: err.errors.map(e => e.message)
                });
            }

            res.status(500).json({
                error: 'Failed to create asset',
                message: err.message
            });
        }
    }

    async getAssets(req, res) {
        try {
            const { type, status, location, search } = req.query;
            
            let whereClause = {};
            
            if (type) {
                whereClause.type = type;
            }
            
            if (status) {
                whereClause.status = status;
            }
            
            if (location) {
                whereClause.location = location;
            }
            
            if (search) {
                whereClause[Op.or] = [
                    { assetId: { [Op.like]: `%${search}%` } },
                    { name: { [Op.like]: `%${search}%` } },
                    { department: { [Op.like]: `%${search}%` } },
                    { specifications: { [Op.like]: `%${search}%` } }
                ];
            }

            const assets = await Asset.findAll({
                where: whereClause,
                order: [['updatedAt', 'DESC']]
            });
            res.json(assets);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAssetById(req, res) {
        try {
            const asset = await Asset.findByPk(req.params.id);
            if (asset) {
                res.json(asset);
            } else {
                res.status(404).json({ error: 'Asset not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAssetStats(req, res) {
        try {
            const totalAssets = await Asset.count();
            const activeAssets = await Asset.count({ where: { status: 'Active' } });
            const underRepair = await Asset.count({ where: { status: 'Repair' } });
            const inactiveAssets = await Asset.count({ where: { status: 'Inactive' } });
            
            const assetsByType = await Asset.findAll({
                attributes: ['type', [sequelize.fn('COUNT', '*'), 'count']],
                group: ['type']
            });

            const assetsByLocation = await Asset.findAll({
                attributes: ['location', [sequelize.fn('COUNT', '*'), 'count']],
                group: ['location']
            });

            res.json({
                totalAssets,
                activeAssets,
                underRepair,
                inactiveAssets,
                assetsByType,
                assetsByLocation
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    
    async deleteAsset(req, res) {
        try {
            const id = req.params.id;
            console.log('Trying to delete asset with id:', id);
            const deleted = await Asset.destroy({ where: { id } });
            console.log('Deleted count:', deleted);
            if (deleted) {
                res.json({ message: 'Asset deleted' });
            } else {
                res.status(404).json({ error: 'Asset not found' });
            }
        } catch (err) {
            console.error('Delete error:', err);
            res.status(500).json({ error: err.message });
        }
    }

    
    async updateAsset(req, res) {
        try {
            const id = req.params.id;
            console.log('Updating asset with id:', id);
            console.log('Update data:', req.body);

            
            const existingAsset = await Asset.findByPk(id);
            if (!existingAsset) {
                return res.status(404).json({ error: 'Asset not found' });
            }

            
            await existingAsset.update(req.body);
            
            
            const updatedAsset = await Asset.findByPk(id);
            console.log('Asset updated successfully:', updatedAsset.toJSON());
            
            res.json(updatedAsset);
        } catch (err) {
            console.error('Update error:', err);
            res.status(400).json({ 
                error: 'Failed to update asset',
                message: err.message 
            });
        }
    }

    async bulkUpdateAssets(req, res) {
        try {
            const { ids, updates } = req.body;
            const [updated] = await Asset.update(updates, {
                where: { id: { [Op.in]: ids } }
            });
            if (updated > 0) {
                const updatedAssets = await Asset.findAll({
                    where: { id: { [Op.in]: ids } }
                });
                res.json(updatedAssets);
            } else {
                res.status(404).json({ error: 'No assets found to update' });
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = AssetController;