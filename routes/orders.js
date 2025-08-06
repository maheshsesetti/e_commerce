const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Place order (authenticated user)
router.post('/', auth, async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }
        
        let total = 0;
        const orderItems = [];
        
        // Validate items and calculate total
        for (const item of items) {
            const product = await Product.findById(item.productId);
            
            if (!product) {
                return res.status(400).json({ message: `Product ${item.productId} not found` });
            }
            
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }
            
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
            
            // Update stock
            product.stock -= item.quantity;
            await product.save();
        }
        
        const order = new Order({
            user: req.user._id,
            items: orderItems,
            total,
            shippingAddress,
            paymentMethod
        });
        
        await order.save();
        
        // Populate product details for response
        await order.populate('items.product');
        
        res.status(201).json({
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({ message: 'Error placing order' });
    }
});

// Get all orders (admin only)
router.get('/', adminAuth, async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        
        let query = {};
        if (status) query.status = status;
        
        const orders = await Order.find(query)
            .populate('items.product')
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await Order.countDocuments(query);
        
        res.json({
            orders,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalOrders: total
            }
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Get user's orders (authenticated user)
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        
        res.json(orders);
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Get single order (authenticated user or admin)
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product')
            .populate('user', 'name email');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if user is authorized to view this order
        if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }
        
        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Error fetching order' });
    }
});

// Update order status (admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
    try {
        const { status, trackingNumber, estimatedDelivery } = req.body;
        
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        if (status) order.status = status;
        if (trackingNumber) order.trackingNumber = trackingNumber;
        if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;
        
        await order.save();
        
        await order.populate('items.product');
        await order.populate('user', 'name email');
        
        res.json({
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Error updating order status' });
    }
});

module.exports = router; 