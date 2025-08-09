# E-Commerce Admin Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS for managing e-commerce operations.

## Features

### 🔐 Authentication
- Admin login with email/password
- Forgot password functionality
- Protected routes with authentication guards
- Demo credentials: `admin@example.com` / `admin123`

### 📊 Dashboard
- Overview statistics (Total Sales, Orders, Customers, Products)
- Interactive charts and graphs (Sales over time, Active users)
- Recent orders summary
- Category distribution visualization

### 🛍️ Product Management
- List, create, edit, and delete products
- Bulk upload via CSV (UI ready)
- Stock management
- Image upload functionality (UI ready)
- Product status management (active/inactive/draft)

### 📚 Category Management
- Add, edit, and delete categories
- Manage subcategories with expandable tree view
- Category status management
- Product count tracking per category

### 📦 Order Management
- View all orders with detailed information
- Update order status (pending, processing, shipped, delivered, cancelled)
- Refund and cancel actions (UI ready)
- Payment status tracking
- Order filtering and search

### 👥 Customer Management
- List of registered users with profiles
- View customer order history
- Ban/unban users functionality (UI ready)
- Customer status management
- Search and filter customers

### 🔔 Banner & Promotion Management
- Upload promotional banners (UI ready)
- Set flash sales (UI ready)
- Create and manage coupons (UI ready)
- Campaign management interface

### 💳 Payments
- View transaction history (UI ready)
- Process refunds (UI ready)
- Settlement reports (UI ready)
- Payment method tracking

### 📈 Reports & Analytics
- Sales reports (UI ready)
- Product performance analytics (UI ready)
- Inventory low stock alerts (UI ready)
- Custom date range filtering

### ⚙️ Settings
- Admin profile management (UI ready)
- Change password functionality (UI ready)
- Site configurations (currency, tax, etc.) (UI ready)
- System preferences

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Yup validation
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Axios (configured)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the admin dashboard directory:
   ```bash
   cd admin-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Demo Login
- **Email**: admin@example.com
- **Password**: admin123

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar, Layout)
│   └── ui/             # UI components (StatsCard, etc.)
├── contexts/           # React contexts (AuthContext)
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── products/       # Product management
│   ├── categories/     # Category management
│   ├── orders/         # Order management
│   ├── customers/      # Customer management
│   ├── banners/        # Banner management
│   ├── payments/       # Payment management
│   ├── reports/        # Reports and analytics
│   └── settings/       # Settings pages
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

## Features Status

✅ **Completed**:
- Authentication system (login, forgot password)
- Dashboard with charts and statistics
- Product listing and management UI
- Category management with subcategories
- Order management interface
- Customer management
- Responsive design
- Protected routing
- Modern UI with Tailwind CSS

🚧 **UI Ready (Backend Integration Needed)**:
- Bulk product upload
- Image upload functionality
- Order status updates
- Customer ban/unban actions
- Banner and promotion management
- Payment processing
- Report generation
- Settings management

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme customization
- Adding custom CSS classes in component files
- Updating the color scheme in the config file

### API Integration
To connect with your backend:
1. Update the API endpoints in the `services/` directory
2. Replace mock data with actual API calls
3. Implement proper error handling
4. Add loading states for better UX

### Adding New Features
1. Create new page components in the `pages/` directory
2. Add routes in `App.tsx`
3. Update the sidebar navigation in `components/layout/Sidebar.tsx`
4. Add necessary types in `types/index.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.