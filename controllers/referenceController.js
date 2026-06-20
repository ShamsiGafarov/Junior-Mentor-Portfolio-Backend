const Reference = require('../models/Reference');

exports.getAll = async (req, res, next) => {
    try {
        const references = await Reference.find();
        const data = references.map(ref => ({
            ...ref._doc,
            id: ref._id
        }));
        res.status(200).json({
            success: true,
            message: 'References list retrieved successfully.',
            data: data
        });
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);
        if (!reference) {
            const error = new Error('Reference not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Reference retrieved successfully.',
            data: {
                ...reference._doc,
                id: reference._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        const { name, firstName, lastName, testimonial, position, company, email } = req.body;
        
        // Handle both formats: 'name' OR 'firstName+lastName'
        let fullName = name;
        if (!fullName && firstName && lastName) {
            fullName = `${firstName} ${lastName}`;
        }
        if (!fullName) {
            fullName = 'Unknown User';
        }
        
        // Use email as testimonial if testimonial is missing
        const testimonialText = testimonial || `Reference from ${fullName}`;
        
        const reference = new Reference({ 
            name: fullName, 
            testimonial: testimonialText, 
            position: position || 'Professional', 
            company: company || 'Unknown Company'
        });
        await reference.save();
        res.status(201).json({
            success: true,
            message: 'Reference added successfully.',
            data: {
                ...reference._doc,
                id: reference._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!reference) {
            const error = new Error('Reference not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Reference updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndDelete(req.params.id);
        if (!reference) {
            const error = new Error('Reference not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'Reference deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};