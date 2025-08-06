# E-Commerce Backend API

A complete Node.js backend for an e-commerce platform with user authentication, product management, order processing, and payment integration.

## Features

| Feature             | Route                           | Description                              |
| ------------------- | ------------------------------- | ---------------------------------------- |
| ✅ User Auth         | `POST /register`, `POST /login` | Register and login users                 |
| ✅ Product CRUD      | `GET/POST/PUT/DELETE /products` | Add/edit/delete products (Admin only)    |
| ✅ Orders            | `POST /orders`                  | User can place order                     |
| ✅ Payments (Mock)   | `POST /payment`                 | Simulate payment (Stripe/Razorpay later) |
| ✅ Shipment Tracking | `GET /orders/:id`               | Track order status                       |

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e_commerce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

4. Start MongoDB (if using local):
```bash
# Start MongoDB service
mongod
```

5. Run the application:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```

### Products

#### Get All Products
```
GET /api/products?category=electronics&search=laptop&sort=price&order=asc&limit=10
```

#### Get Single Product
```
GET /api/products/:id
```

#### Create Product (Admin Only)
```
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stock": 50,
  "category": "electronics",
  "images": ["image1.jpg", "image2.jpg"]
}
```

#### Update Product (Admin Only)
```
PUT /api/products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 899.99,
  "stock": 45
}
```

#### Delete Product (Admin Only)
```
DELETE /api/products/:id
Authorization: Bearer <admin_token>
```

#### Get Categories
```
GET /api/products/categories/list
```

### Orders

#### Place Order
```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product_id_here",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

#### Get User Orders
```
GET /api/orders/my-orders
Authorization: Bearer <token>
```

#### Get Single Order
```
GET /api/orders/:id
Authorization: Bearer <token>
```

#### Update Order Status (Admin Only)
```
PUT /api/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRK123456789",
  "estimatedDelivery": "2024-01-15T00:00:00.000Z"
}
```

#### Get All Orders (Admin Only)
```
GET /api/orders?status=pending&page=1&limit=10
Authorization: Bearer <admin_token>
```

### Payments

#### Process Payment
```
POST /api/payment/process
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "order_id_here",
  "paymentMethod": "credit_card",
  "paymentDetails": {
    "cardNumber": "4111 1111 1111 1111",
    "expiryMonth": "12",
    "expiryYear": "2025",
    "cvv": "123"
  }
}
```

#### Get Payment Status
```
GET /api/payment/status/:orderId
Authorization: Bearer <token>
```

#### Process Refund (Admin Only)
```
POST /api/payment/refund/:orderId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reason": "Customer request"
}
```

## Database Models

### User
- name, email, password (hashed)
- role (user/admin)
- address information
- timestamps

### Product
- name, description, price, stock
- category, images
- rating, numReviews
- isActive flag
- timestamps

### Order
- user reference
- items array with product, quantity, price
- total amount
- status (pending, processing, shipped, delivered, cancelled)
- shipping address
- payment method and status
- tracking information
- timestamps

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Development

### Creating an Admin User

To create an admin user, you can either:

1. Modify the user role directly in the database
2. Add an admin creation endpoint (for development only)

### Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

## Production Considerations

1. Use a strong JWT secret
2. Enable HTTPS
3. Set up proper CORS configuration
4. Implement rate limiting
5. Add input validation
6. Set up logging
7. Configure proper error handling
8. Use environment-specific configurations

## Future Enhancements

- Real payment gateway integration (Stripe, Razorpay)
- Email notifications
- File upload for product images
- Advanced search and filtering
- User reviews and ratings
- Shopping cart functionality
- Discount and coupon system
- Analytics and reporting 