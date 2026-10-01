# ERP Order Management — Phase 1

Standalone ERP built with **Node.js + Express + MongoDB/Mongoose**. The UI is served directly by Express, so there is no separate frontend project or build step.

## Architecture

```text
ERP UI (Express static files)
        |
        | REST API
        v
Node.js + Express
        |
        | Mongoose
        v
MongoDB
```

## Current scope

- ERP shell inspired by modern ERP products
- Orders list
- Search orders
- Filter by status
- Order details
- Create test order
- Update order status
- Delete order
- MongoDB persistence
- REST API
- Seed data
- Health endpoint
- Basic validation
- CORS
- Helmet
- Morgan request logging

## Deliberately not included

- Raftaar API integration
- Authentication / authorization
- Payment integration
- Logistics / Shiprocket
- Inventory
- Accounting
- Seller management
- Webhooks
- Production secrets

The future Raftaar integration belongs in the backend. The browser should not call Raftaar directly.

## Requirements

- Node.js 20 or newer
- MongoDB local installation or MongoDB Atlas

## Run directly in VS Code

### 1. Extract the ZIP

Open the extracted `erp-system` folder in VS Code.

### 2. Install packages

```bash
npm install
```

### 3. Configure MongoDB

Copy the environment file:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Edit `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/erp_system
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### 4. Start

Development mode:

```bash
npm run dev
```

Normal mode:

```bash
npm start
```

Open:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

## REST API

Base URL:

```text
http://localhost:5000/api
```

### List orders

```http
GET /orders
GET /orders?search=Rahul
GET /orders?status=pending
```

### Get order

```http
GET /orders/:id
```

### Create order

```http
POST /orders
Content-Type: application/json
```

Example:

```json
{
  "orderId": "ORD-20001",
  "customer": {
    "name": "Test Customer",
    "phone": "9876543210",
    "email": "test@example.com"
  },
  "items": [
    {
      "productName": "Demo Product",
      "sku": "DEMO-001",
      "quantity": 2,
      "price": 500
    }
  ],
  "shippingAddress": {
    "addressLine1": "10 Demo Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  }
}
```

The backend calculates `totalAmount`; clients do not need to send it.

### Update order

```http
PATCH /orders/:id
Content-Type: application/json
```

```json
{
  "status": "processing"
}
```

### Delete order

```http
DELETE /orders/:id
```

## Project structure

```text
erp-system/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── app.css
│   └── js/
│       └── app.js
├── src/
│   ├── controllers/
│   │   └── orderController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Order.js
│   ├── routes/
│   │   └── orderRoutes.js
│   ├── app.js
│   ├── db.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Deployment

Deploy the Node.js application and set:

```env
PORT=<platform-provided-port>
NODE_ENV=production
MONGODB_URI=<your MongoDB connection string>
```

The application serves both the UI and API from the same server.

## Future integration

Current:

```text
ERP UI
  ↓
ERP Backend
  ↓
MongoDB
```

Future:

```text
Raftaar Platform
  ↓
Raftaar API / SDK
  ↓
ERP Backend
  ↓
MongoDB
  ↓
ERP UI
```
