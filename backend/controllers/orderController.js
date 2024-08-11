const orderModel = require('../models/orderModel');

// Create order
exports.createOrder = async (req, res, next) => {
    const cartItems = req.body;

    // Validate cartItems
    if (!Array.isArray(cartItems)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid input, cartItems should be an array'
        });
    }

    // Calculate the total amount
    const amount = cartItems.reduce((acc, item) => {
        if (item.product && item.product.price && item.qty) {
            return acc + item.product.price * item.qty;
        }
        return acc;
    }, 0).toFixed(2);

    const status = 'pending';

    // Create order in the database
    try {
        const order = await orderModel.create({ cartItems, amount, status });
        res.json({
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};
