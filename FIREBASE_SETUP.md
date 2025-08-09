# Firebase Storage Integration Setup

This guide will help you set up Firebase Storage for image uploads in your e-commerce application.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Node.js and npm installed

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "ecommerce-e6062")
4. Follow the setup wizard

**Note:** Your project is already created with ID: `ecommerce-e6062`

### 2. Enable Storage

1. In your Firebase project console, go to "Storage" in the left sidebar
2. Click "Get started"
3. Choose a location for your storage bucket
4. Start in test mode (you can change security rules later)

### 3. Generate Service Account Key

1. In Firebase Console, go to Project Settings (gear icon)
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. **Keep this file secure and never commit it to version control**

### 4. Update Firebase Configuration

1. Open `config/firebase.js`
2. Replace the placeholder service account object with your actual service account details:

```javascript
const serviceAccount = {
  "type": "service_account",
  "project_id": "ecommerce-e6062",
  "private_key_id": "your-actual-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYour actual private key\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@ecommerce-e6062.iam.gserviceaccount.com",
  "client_id": "your-actual-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40ecommerce-e6062.iam.gserviceaccount.com"
};
```

3. Update the storage bucket name:
```javascript
storageBucket: 'ecommerce-e6062.firebasestorage.app'
```

### 5. Environment Variables (Recommended)

For better security, use environment variables:

1. Create a `.env` file in your project root
2. Add your Firebase configuration:

```env
FIREBASE_PROJECT_ID=ecommerce-e6062
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@ecommerce-e6062.iam.gserviceaccount.com
FIREBASE_STORAGE_BUCKET=ecommerce-e6062.firebasestorage.app
```

3. Update `config/firebase.js` to use environment variables:

```javascript
require('dotenv').config();

const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});
```

### 6. Update Security Rules (Optional)

In Firebase Console > Storage > Rules, you can customize access rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null;  // Only authenticated users can write
    }
  }
}
```

## API Endpoints

### Create Product with Images
```
POST /api/products
Content-Type: multipart/form-data

Fields:
- name: string
- description: string
- price: number
- stock: number
- category: string
- images: file[] (multiple image files)
```

### Update Product with Images
```
PUT /api/products/:id
Content-Type: multipart/form-data

Fields:
- name: string (optional)
- description: string (optional)
- price: number (optional)
- stock: number (optional)
- category: string (optional)
- isActive: boolean (optional)
- images: file[] (optional, will replace existing images)
```

### Add Images to Existing Product
```
POST /api/products/:id/images
Content-Type: multipart/form-data

Fields:
- images: file[] (multiple image files)
```

### Delete Specific Image
```
DELETE /api/products/:id/images/:imageIndex
```

## Features

- ✅ Multiple image upload support
- ✅ Automatic image deletion when product is deleted
- ✅ Image replacement with old image cleanup
- ✅ File type validation (JPEG, PNG, GIF, WebP)
- ✅ File size limits (5MB per image)
- ✅ Unique filename generation
- ✅ Public URL generation for easy access

## Error Handling

The API includes comprehensive error handling for:
- Invalid file types
- File size limits
- Upload failures
- Firebase Storage errors
- Database errors

## Security Notes

1. **Never commit your Firebase service account key to version control**
2. Use environment variables for sensitive configuration
3. Set up proper Firebase Storage security rules
4. Consider implementing image compression for better performance
5. Monitor your Firebase Storage usage and costs

## Testing

You can test the image upload functionality using tools like:
- Postman
- Insomnia
- curl commands

Example curl command:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "name=Test Product" \
  -F "description=Test Description" \
  -F "price=99.99" \
  -F "stock=10" \
  -F "category=Electronics" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
``` 