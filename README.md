# BuyIT E-Commerce Platform

**BuyIT** is a full-stack e-commerce platform built with the MERN (MongoDB, Express, React, Node.js) stack. It provides a seamless online shopping experience with features tailored for both users and administrators.
This project is part of the final submission for my internship at Innomatics Research Labs.

## Live At : [BuyIT.com](https://buyit-ecommerce.onrender.com)

---

## Features

### General
- Full-stack architecture with a responsive design.
- Secure and scalable setup.

### User-Focused Features
- **Authentication**: User registration, login, and role-based access (JWT).
- **Product Browsing**: Search, filter, and sort products by categories, price, and ratings.
- **Cart & Wishlist**: Add items to the cart or wishlist and proceed to checkout.
- **Order Management**: Place and track orders with email notifications.
- **Reviews & Ratings**: Users can leave feedback on products.

### Admin-Focused Features
- **Product Management**: Add, edit, or delete products.
- **Order Processing**: Manage order statuses (pending, shipped, delivered).
- **Analytics**: Dashboard with insights into sales, users, and products.

### Additional Features
- **Payment Integration**: Secure payments via Razorpay.
- **Media Uploads**: Store and retrieve product images efficiently.
- **Database Seeding**: Seed initial data using a script.

---

## Technologies Used

### Frontend
- **React.js**: Modern UI development.
- **Redux**: State management.
- **Bootstrap**: Responsive design.

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: Database for storing application data.

### Authentication & Security
- **JWT**: Token-based authentication.
- **BCrypt**: Secure password hashing.

### Deployment
- **Render**: Fullstack deployment (frontend + backend).

---

## Project Structure

```plaintext
BuyIT-ECommerce/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # API logic
│   ├── data/            # Database seeders and test data
│   ├── middleware/      # Middleware functions
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route definitions
│   ├── utils/           # Utility functions
│   ├── server.js        # Backend entry point
│   └── seeder.js        # Database seeding script
│
├── frontend/
│   ├── build/           # Production-ready files
│   ├── public/          # Public assets
│   ├── src/             # Source code
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── redux/       # State management setup
│   │   └── App.js       # Main frontend file
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend-specific README
│
├── uploads/             # Media uploads (images, files)
├── .env                 # Environment variables
├── package.json         # Project metadata and scripts
└── README.md            # Main documentation
```
---

## Getting Started

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **Git**
- **Razorpay** API keys ( KeyID and Key Secret)
- **Brevo** SMTP key (Account and password)

### Installation
1. Clone the repository:
  ```bash
   git clone https://github.com/firdoushassan/BuyIT-Ecommerce.git
   cd BuyIT-Ecommerce
   ```
3. Install dependencies:
  ```bash
  # Install backend dependencies
  cd backend
  npm install
  cd ..

  # Install frontend dependencies
  cd frontend
  npm install
  cd ..
  ```
3. Set up environment variables:
   - Create .env file in root directory.
     ```env
     NODE_ENV=development
     PORT=5000
     JWT_SECRET=ADD_YOUR_JWT_SECRET_HERE
     MONGO_URI=ADD_YOUR_MONGO_URI_HERE
     RAZORPAY_KEY_ID=ADD_YOUT_RAZORPAY_KEY_ID
     RAZORPAY_KEY_SECRET=ADD_YOUR_RAZORPAY_KEY_SECRET
     PAGINATION_MAX_LIMIT=20       # This will show 20 products per page
     EMAIL_HOST=smtp-relay.brevo.com
     EMAIL_PORT=587
     EMAIL_USER=ADD_YOUR_BREVO_LOGIN
     EMAIL_PASS=ADD_YOUR_BREVO_PASSWORD
     EMAIL_FROM=ADD_YOUR_BREVO_LOGIN
     ```
4. Run the application:
   - To run both the frontend and backend concurrently, use:
    ```bash
    npm run dev
    ```
    - To run only the backend:
     ```bash
    npm run server
     ```
     
## Sample User Logins
  - Live Admin Dashboard Login:: https://buyit-ecommerce.onrender.com/admin/login
      - Email: firdous@admin.com
      - Password: firdous123
  - Live Customer Login:: https://buyit-ecommerce.onrender.com/login
      - Sample User :
        - Email: david@email.com
        - Password: david123
      - Create your own account : https://buyit-ecommerce.onrender.com/register
   
  
