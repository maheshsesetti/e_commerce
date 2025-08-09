const express = require('express');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadSingle, uploadMultiple } = require('../middleware/upload');
const { uploadImage, uploadMultipleImages, deleteMultipleImages, deleteImage } = require('../utils/firebaseStorage');

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
    try {
        const { category, search, sort = 'createdAt', order = 'desc' } = req.query;
        
        let query = { isActive: true };
        
        // Filter by category
        if (category) {
            query.category = category;
        }
        
        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        
        const products = await Product.find(query)
            .sort({ [sort]: order === 'desc' ? -1 : 1 })
            .limit(parseInt(req.query.limit) || 50);
        
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Get categories (public)
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(product);
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// Create product with image upload (admin only)
router.post('/', adminAuth, uploadMultiple, async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        
        let imageUrls = [];
        
        // Upload images to Firebase Storage if files are provided
        if (req.files && req.files.length > 0) {
            try {
                imageUrls = await uploadMultipleImages(req.files, 'products');
            } catch (uploadError) {
                return res.status(400).json({ 
                    message: 'Error uploading images',
                    error: uploadError.message 
                });
            }
        }
        
        const product = new Product({
            name,
            description,
            price,
            stock,
            category,
            images: imageUrls
        });
        
        await product.save();
        
        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
});

// Update product with image upload (admin only)
router.put('/:id', adminAuth, uploadMultiple, async (req, res) => {
    try {
        const { name, description, price, stock, category, isActive } = req.body;
        
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Handle image uploads if files are provided
        if (req.files && req.files.length > 0) {
            try {
                const newImageUrls = await uploadMultipleImages(req.files, 'products');
                
                // Delete old images from Firebase Storage
                if (product.images && product.images.length > 0) {
                    await deleteMultipleImages(product.images);
                }
                
                // Update with new image URLs
                product.images = newImageUrls;
            } catch (uploadError) {
                return res.status(400).json({ 
                    message: 'Error uploading images',
                    error: uploadError.message 
                });
            }
        }
        
        // Update other fields
        if (name) product.name = name;
        if (description) product.description = description;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;
        if (category) product.category = category;
        if (isActive !== undefined) product.isActive = isActive;
        
        await product.save();
        
        res.json({
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Delete product (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Delete images from Firebase Storage
        if (product.images && product.images.length > 0) {
            await deleteMultipleImages(product.images);
        }
        
        await Product.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Upload additional images to existing product (admin only)
router.post('/:id/images', adminAuth, uploadMultiple, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images provided' });
        }
        
        // Upload new images to Firebase Storage
        const newImageUrls = await uploadMultipleImages(req.files, 'products');
        
        // Add new image URLs to existing images
        product.images = [...(product.images || []), ...newImageUrls];
        
        await product.save();
        
        res.json({
            message: 'Images uploaded successfully',
            product
        });
    } catch (error) {
        console.error('Upload images error:', error);
        res.status(500).json({ message: 'Error uploading images' });
    }
});

// Delete specific image from product (admin only)
router.delete('/:id/images/:imageIndex', adminAuth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        const imageIndex = parseInt(req.params.imageIndex);
        
        if (imageIndex < 0 || imageIndex >= product.images.length) {
            return res.status(400).json({ message: 'Invalid image index' });
        }
        
        // Delete image from Firebase Storage
        const imageUrl = product.images[imageIndex];
        await deleteImage(imageUrl);
        
        // Remove image URL from array
        product.images.splice(imageIndex, 1);
        await product.save();
        
        res.json({
            message: 'Image deleted successfully',
            product
        });
    } catch (error) {
        console.error('Delete image error:', error);
        res.status(500).json({ message: 'Error deleting image' });
    }
});

module.exports = router; 