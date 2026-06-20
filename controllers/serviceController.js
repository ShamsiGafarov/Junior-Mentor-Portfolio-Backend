const Service = require('../models/Service');

exports.getAll = async (req, res, next) => {
    try {
        const services = await Service.find();
        const data = services.map(s => ({
            ...s._doc,
            id: s._id
        }));
        res.status(200).json({
            success: true,
            message: 'Services list retrieved successfully.',
            data: data
        });
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            const error = new Error('Service not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Service retrieved successfully.',
            data: {
                ...service._doc,
                id: service._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const service = new Service({ title, description });
        await service.save();
        res.status(201).json({
            success: true,
            message: 'Service added successfully.',
            data: {
                ...service._doc,
                id: service._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!service) {
            const error = new Error('Service not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Service updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            const error = new Error('Service not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Service deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};