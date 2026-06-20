const Project = require('../models/Project');

exports.getAll = async (req, res, next) => {
    try {
        const projects = await Project.find();
        const data = projects.map(p => ({
            ...p._doc,
            id: p._id
        }));
        res.status(200).json({
            success: true,
            message: 'Projects list retrieved successfully.',
            data: data
        });
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Project retrieved successfully.',
            data: {
                ...project._doc,
                id: project._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        const { title, completion, description, image } = req.body;
        const project = new Project({ title, completion, description, image });
        await project.save();
        res.status(201).json({
            success: true,
            message: 'Project added successfully.',
            data: {
                ...project._doc,
                id: project._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Project updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            const error = new Error('Project not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};