# Book Catalog API

A simple REST API built using Node.js, Express, MongoDB, and JWT Authentication. Users can register, log in, and perform full CRUD operations on books.

## Installation
Run:
npm install

Create a `.env` file:
PORT=5000
DB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>

Start the server:
npm run dev

The server runs at:
http://localhost:5000

## API Endpoints

### User Routes
POST /api/users/register → Register a user
POST /api/users/login → Login & get JWT

### Book Routes
GET /api/books → Get all books
GET /api/books/:id → Get book by ID
POST /api/books → Create book (requires JWT)
PUT /api/books/:id → Update book (requires JWT)
DELETE /api/books/:id → Delete book (requires JWT)

Protected routes require:
Authorization: Bearer <token>

## Postman Usage
Import:
- Book_Catalog_API.postman_collection.json
- BookAPI.postman_environment.json

In your Postman environment set:
base_url = http://localhost:5000
token = <paste_login_token_here>

Test in this order:
1. Register
2. Login → copy token → paste into environment
3. Create / Get / Update / Delete books

## Deployment (Render)
Set environment variables:
PORT=5000
DB_URI=<mongodb_uri>
JWT_SECRET=<jwt_secret>

Build command:
npm install

Start command:
npm start

Your API will deploy automatically.

## Done
This backend is clean, simple, fully working, and ready for submission.
