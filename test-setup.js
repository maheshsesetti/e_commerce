const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

// Test database connection
async function testConnection() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Database connection successful');
        
        // Test creating a test user
        const testUser = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'admin'
        });
        
        await testUser.save();
        console.log('✅ User model working');
        
        // Test creating a test product
        const testProduct = new Product({
            name: 'Test Product',
            description: 'A test product',
            price: 99.99,
            stock: 10,
            category: 'test'
        });
        
        await testProduct.save();
        console.log('✅ Product model working');
        
        // Clean up test data
        await User.deleteOne({ email: 'test@example.com' });
        await Product.deleteOne({ name: 'Test Product' });
        console.log('✅ Test data cleaned up');
        
        await mongoose.connection.close();
        console.log('✅ All tests passed! Server is ready to run.');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\nMake sure MongoDB is running:');
        console.log('1. Install MongoDB if not already installed');
        console.log('2. Start MongoDB service: mongod');
        console.log('3. Run: npm run dev');
    }
}

testConnection(); 