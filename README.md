# Trek Bikes E-Commerce

Hey there! Welcome to my Trek Bikes E-Commerce project. This full-stack application manages an online store for Trek bikes with a REST API that supports complete CRUD operations for products, carts, and users using MongoDB via Mongoose (with local files as backup). All endpoints and views are in English.

## What This Project Does

- **Dual Persistence:**  
  Data is stored in MongoDB (primary) and backed up in JSON files.
- **Product Management:**  
  Create, read (with filtering and pagination), update, and delete products. Each product has a title, category, thumbnails, price, stock, and description.
- **User Management:**  
  Users have a MongoDB-generated ID, a default photo URL, email (required), password (required), and a role (default "USER").
- **Cart Management:**  
  Each cart is linked to a user and contains an array of products (each with a product ID and quantity). It handles adding items, updating quantities (ensuring you don’t exceed available stock), and removing items.
- **Checkout Process:**  
  A checkout page collects shipping information (address and phone) and creates an order in the database.
- **API Endpoints:**  
  Fully RESTful endpoints for products, carts, users, and orders (checkout) with error handling and logging (using Morgan).
- **Views:**  
  - **Landing Page (/):** Navigation, logo, paginated product catalog with category filter.
  - **Product Detail (/products/:pid):** Product information with an "Add to Cart" button.
  - **Real-Time Products (/products/real):** Create products in real time.
  - **User Registration (/users/register) & Login (/users/login):** Simple forms (non-functional).
  - **User Profile (/users/:uid):** Displays user details.
  - **Cart Page (/carts/:uid):** Shows the cart with options to update quantities, remove items, and navigate to checkout.
  - **Checkout (/checkout):** Collects shipping information and submits the order.
- **Environment Variables:**  
  The MongoDB connection is configured via a `.env` file.


