const Service = require('../models/service');

class ServiceController {
    async addService(req, res) {
        try {
            const service = await Service.create(req.body);
            res.status(201).json(service);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getServices(req, res) {
        try {
            const services = await Service.findAll({ order: [['createdAt', 'ASC']] });
            res.json(services);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteService(req, res) {
        try {
            const id = req.params.id;
            const deleted = await Service.destroy({ where: { id } });
            if (deleted) {
                res.json({ message: 'Service deleted' });
            } else {
                res.status(404).json({ error: 'Service not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateService(req, res) {
        try {
            const id = req.params.id;
            const service = await Service.findByPk(id);
            if (!service) {
                return res.status(404).json({ error: 'Service not found' });
            }
            await service.update(req.body);
            res.json(service);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ServiceController; 