
# 📚 Library Management System

A RESTful API built with **TypeScript**, **Express.js**, and **MongoDB** to manage a library’s book catalog and borrowing functionality.

---

## ✅ Features Implemented

- 📘 Create, Read, Update, Delete (CRUD) for books
- 📥 Borrow book functionality with stock validation
- 📊 Aggregation for borrowed book summaries
- ✅ Mongoose schema validation and custom error responses
- ⚙️ Business logic: borrowing availability, quantity control
- 🧠 Mongoose static methods, instance methods, middleware
- 🔍 Filtering, sorting, and pagination
- 🛠️ Centralized error handling

---

## 🗂️ Project Structure

```

src/
├── app/
│   ├── controllers
│   │   ├── book.controller.ts
│   │   └── borrow.controller.ts
│   ├── interfaces
│   │   ├── book.interfaces.ts
│   │   └── borrow.interface.ts
│   ├── models
│   │   ├── book.model.ts
│   │   └── borrow.model.ts
│   ├── utils
│   │   ├── apiFunctionality.ts
│   │   └── errorHandler.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── vercel.json

````

---

## ⚙️ Technologies Used

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Vercel** for deployment
- **Dotenv** for environment variable handling

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/reduanahmadswe/L2B5A3.git
cd L2B5A3
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup `.env` File

Create a `.env` file in the root folder:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/librarymanagementapi
```

> Replace `DATABASE_URL` with your MongoDB URI if using MongoDB Atlas.

### 4️⃣ Run the Project

```bash
npm run dev
```

Project runs at `http://localhost:5000`

---

## 📮 API Endpoints

### 🔹 Book Routes

| Method | Endpoint         | Description                         |
| ------ | ---------------- | ----------------------------------- |
| POST   | `/api/books`     | Create a new book                   |
| GET    | `/api/books`     | Get all books (filter, sort, limit) |
| GET    | `/api/books/:id` | Get a book by ID                    |
| PUT    | `/api/books/:id` | Update a book                       |
| DELETE | `/api/books/:id` | Delete a book                       |

### 🔹 Borrow Routes

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| POST   | `/api/borrow` | Borrow a book                        |
| GET    | `/api/borrow` | Borrowed books summary (aggregation) |

---

## 🧪 Sample Request: Create Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

## 📊 Borrow Summary (Aggregation)

**GET** `/api/borrow`

**Response:**

```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "book": {
                "title": "The Selfish Gene",
                "isbn": "9780192860927"
            },
            "totalQuantity": 1
        },
        {
            "book": {
                "title": "The Mystery of the Universe",
                "isbn": "9789848001234"
            },
            "totalQuantity": 30
        },
        {
            "book": {
                "title": "Educated",
                "isbn": "9780399590504"
            },
            "totalQuantity": 1
        },
        {
            "book": {
                "title": "Thinking, Fast and Slow",
                "isbn": "9780374533557"
            },
            "totalQuantity": 1
        }
    ]
}
```

---

## ⚠️ Error Response Structure

```json
{
    "message": "Validation failed",
    "success": false,
    "error": {
        "name": "ValidationError",
        "errors": {
            "quantity": {
                "message": "Path `quantity` (-10) is less than minimum allowed value (1).",
                "name": "ValidatorError",
                "properties": {
                    "message": "Path `quantity` (-10) is less than minimum allowed value (1).",
                    "type": "min",
                    "min": 1
                },
                "kind": "min",
                "path": "quantity",
                "value": -10
            }
        }
    }
}
```

---


---

## 🌍 Live Deployment

> 🔗 [https://library-management-system.vercel.app](https://library-management-ten-beta.vercel.app)

## 🙌 Author

**Reduan Ahmad**

https://github.com/reduanahmadswe/
