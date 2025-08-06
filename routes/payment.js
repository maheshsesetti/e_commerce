const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Mock payment processing
router.post('/process', auth, async (req, res) => {
    try {
        const { orderId, paymentMethod, paymentDetails } = req.body;
        
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if user owns this order
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to pay for this order' });
        }
        
        // Check if order is already paid
        if (order.paymentStatus === 'completed') {
            return res.status(400).json({ message: 'Order is already paid' });
        }
        
        // Mock payment processing
        const paymentResult = await processMockPayment(paymentMethod, paymentDetails, order.total);
        
        if (paymentResult.success) {
            // Update order payment status
            order.paymentStatus = 'completed';
            order.status = 'processing'; // Move to processing after payment
            await order.save();
            
            res.json({
                message: 'Payment processed successfully',
                paymentId: paymentResult.paymentId,
                order: {
                    id: order._id,
                    total: order.total,
                    status: order.status,
                    paymentStatus: order.paymentStatus
                }
            });
        } else {
            order.paymentStatus = 'failed';
            await order.save();
            
            res.status(400).json({
                message: 'Payment failed',
                error: paymentResult.error
            });
        }
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({ message: 'Error processing payment' });
    }
});

// Mock payment processing function
async function processMockPayment(paymentMethod, paymentDetails, amount) {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock payment validation
    if (!paymentDetails || !paymentDetails.cardNumber) {
        return {
            success: false,
            error: 'Invalid payment details'
        };
    }
    
    // Mock card validation (simple check for demo)
    const cardNumber = paymentDetails.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return {
            success: false,
            error: 'Invalid card number'
        };
    }
    
    // Mock success rate (90% success for demo)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
        return {
            success: true,
            paymentId: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
    } else {
        return {
            success: false,
            error: 'Payment declined by bank'
        };
    }
}

// Get payment status
router.get('/status/:orderId', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if user owns this order
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }
        
        res.json({
            orderId: order._id,
            paymentStatus: order.paymentStatus,
            orderStatus: order.status,
            total: order.total
        });
    } catch (error) {
        console.error('Get payment status error:', error);
        res.status(500).json({ message: 'Error fetching payment status' });
    }
});

// Refund payment (admin only)
router.post('/refund/:orderId', auth, async (req, res) => {
    try {
        const { reason } = req.body;
        
        const order = await Order.findById(req.params.orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Only admin can process refunds
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can process refunds' });
        }
        
        if (order.paymentStatus !== 'completed') {
            return res.status(400).json({ message: 'Order is not paid' });
        }
        
        // Mock refund processing
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update order status
        order.status = 'cancelled';
        order.paymentStatus = 'refunded';
        await order.save();
        
        res.json({
            message: 'Refund processed successfully',
            refundId: `REF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            order: {
                id: order._id,
                status: order.status,
                paymentStatus: order.paymentStatus
            }
        });
    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({ message: 'Error processing refund' });
    }
});

module.exports = router; 