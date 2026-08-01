# API Migration Summary

## Overview
This document summarizes the complete migration of a JWT-authenticated Node.js REST API into the Shopify App UI project. The migration was performed on the `api-branch` Git branch.

## Project Structure
```
shopify-app-ui/
├── backend/                    # New backend subdirectory
│   ├── models/               # Sequelize models (User, Product)
│   ├── controllers/          # API controllers (auth, products)
│   ├── routes/               # API routes
│   ├── middleware/           # JWT authentication middleware
│   ├── config/               # Database configuration
│   ├── migrations/           # Database migrations
│   ├── seeders/              # Database seeders
│   ├── postman/              # Postman collections
│   ├── app.js               # Express application
│   ├── server.js            # Server entry point
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Environment variables
│   └── .sequelizerc         # Sequelize CLI config
├── src/
│   ├── services/
│   │   ├── api.js          # New API service for backend communication
│   │   └── mockApi.js      # Legacy mock API (still present)
│   ├── context/
│   │   └── AuthContext.jsx # Updated to use JWT authentication
│   ├── pages/
│   │   └── auth/
│   │       ├── Login.jsx   # Updated for JWT login
│   │       └── Signup.jsx  # Updated for JWT registration
│   └── pages/
│       └── storefront/
│           └── ProductCatalog.jsx # Updated to consume real API
└── package.json             # Updated with concurrent scripts
```

## Changes Made

### 1. Backend Setup
- **Created `backend/` subdirectory** with complete API structure
- **Copied all API files** from `c:\Users\User\Desktop\apis` project
- **Updated `.env`** to point database to `./backend/database.sqlite`
- **Configured CORS** to allow frontend origins (localhost:5173, 127.0.0.1:5173)

### 2. Database Schema Changes
- **Added `imageUrl` field** to Product model with default placeholder
- **Updated migration** `20260728000002-create-products.js` to include imageUrl
- **Ran migrations** successfully to create Users and Products tables

### 3. Authentication Migration
- **Replaced Supabase authentication** with JWT authentication
- **Updated AuthContext.jsx**:
  - Removed Supabase dependencies
  - Implemented JWT token management (localStorage)
  - Updated login/signup to use new API endpoints
  - Removed Google OAuth (not available with JWT)
- **Updated Login.jsx**:
  - Removed Google login button
  - Simplified to use email/password JWT login
- **Updated Signup.jsx**:
  - Changed from `name` to `username` field
  - Removed Google signup button
  - Updated to use JWT registration endpoint

### 4. API Service Layer
- **Created `src/services/api.js`** with:
  - JWT token management functions
  - Auth API endpoints (register, login, profile, logout)
  - Product API endpoints (CRUD operations)
  - Response transformation to match frontend expectations
  - Enhanced error handling with descriptive messages

### 5. Frontend Integration
- **Updated ProductCatalog.jsx**:
  - Replaced mock API calls with real API calls
  - Updated to use `productAPI.getProducts()`
  - Maintained existing UI and functionality
- **Updated root package.json**:
  - Added `concurrently` dependency
  - Added `dev:backend` script
  - Added `dev:all` script to run both servers

### 6. Image Handling Strategy
- **Added `imageUrl` field** to Product model with default placeholder
- **Frontend expects** image URLs from API response
- **Default placeholder**: `https://placehold.co/800x800/1e1e1e/white?text=Product`
- **Products created** with sample images using placeholder service

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (username, email, password)
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/profile` - Get current user profile (protected)

### Products
- `GET /api/products` - List products (paginated + search)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

## Server Configuration

### Backend Server
- **Port**: 5000
- **Database**: SQLite (`./backend/database.sqlite`)
- **Authentication**: JWT (jsonwebtoken)
- **CORS**: Enabled for localhost:5173 and 127.0.0.1:5173

### Frontend Server
- **Port**: 5173 (Vite)
- **API Base URL**: http://localhost:5000/api
- **Token Storage**: localStorage (`authToken`)

## Running the Application

### Start Both Servers
```bash
npm run dev:all
```

### Start Backend Only
```bash
npm run dev:backend
```

### Start Frontend Only
```bash
npm run dev
```

## Database Management

### Run Migrations
```bash
cd backend
npm run migrate
```

### Undo Migrations
```bash
cd backend
npm run migrate:undo
```

## Sample Data
Two sample products were created for testing:
1. **Wireless Headphones** - $79.99 (Electronics)
2. **Smart Watch** - $149.99 (Electronics)

## Testing

### Test Authentication
```bash
# Register
POST http://localhost:5000/api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

# Login
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Test Products
```bash
# Get all products
GET http://localhost:5000/api/products

# Create product (requires JWT token)
POST http://localhost:5000/api/products
Headers: Authorization: Bearer <token>
{
  "title": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category": "Electronics",
  "stock": 10,
  "imageUrl": "https://example.com/image.jpg"
}
```

## Known Issues & Solutions

### 1. CORS Issues
**Problem**: Frontend unable to connect to backend
**Solution**: Updated CORS configuration to include explicit origins, methods, and headers

### 2. Empty Product List
**Problem**: Products page shows "Error: Failed to fetch"
**Solution**: Created sample products in database and improved error handling in API service

### 3. Port Conflicts
**Problem**: Port 5000 already in use
**Solution**: Killed existing process using `taskkill /F /PID <PID>`

## Future Enhancements

1. **Image Upload**: Implement file upload functionality for product images
2. **Token Refresh**: Add JWT token refresh mechanism
3. **Rate Limiting**: Add rate limiting to API endpoints
4. **Validation**: Enhance input validation on both frontend and backend
5. **Error Handling**: Implement more granular error handling and user feedback
6. **Testing**: Add unit and integration tests for API endpoints
7. **Pagination**: Implement client-side pagination for better UX

## Dependencies

### Backend
- express
- sequelize
- sqlite3
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- sequelize-cli

### Frontend
- react
- react-router-dom
- vite
- concurrently

## Git Branch
All changes were made on the `api-branch` branch. To merge to main:
```bash
git checkout main
git merge api-branch
```

## Summary
The migration successfully integrated a JWT-authenticated REST API into the Shopify App UI project. The frontend now communicates with a real backend instead of mock data, while maintaining the existing UI and user experience. The authentication system was completely migrated from Supabase to JWT, and image handling was implemented to ensure products display correctly.
