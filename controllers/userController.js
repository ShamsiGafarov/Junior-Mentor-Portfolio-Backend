const User = require('../models/User');

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        const data = users.map(u => ({
            ...u._doc,
            id: u._id
        }));
        res.status(200).json({
            success: true,
            message: 'Users list retrieved successfully.',
            data: data
        });
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully.',
            data: {
                ...user._doc,
                id: user._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        const { firstname, lastname, firstName, lastName, email, password } = req.body;
        
        // Handle both formats
        const fName = firstname || firstName || 'Unknown';
        const lName = lastname || lastName || 'User';
        
        const user = new User({ 
            firstname: fName, 
            lastname: lName, 
            email: email || `${fName}.${lName}@example.com`,
            password: password || 'default123'
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: 'User added successfully.',
            data: {
                ...user._doc,
                id: user._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};