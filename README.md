# 📃 BookLand - LIBRARY MANAGEMENT

This is a TypeScript Express Application with Mongoose for MongoDB CRUD operations. It includes Book-related endpoints such as adding a book, retrieving a single book, getting all books, updating a book, deleting a book.
And also borrowing a book related endpoints such as adding a borrow record and getting the summary of all books borrow record.

## Live Demo

🔗 [Live API Link](https://bookland-server.vercel.app/)

## Features

- **Book Management**: Add, retrieve, update, and delete books
- **Borrowing System**: Add borrowing records and get borrowing summaries

## Prerequisites

- [Node.js](https://nodejs.org/) Needs to be installed on your machine
- [MongoDB](https://www.mongodb.com/) Needs to be installed locally or a You have MongoDB database URL

## Installation

**1. Clone the repository in your local machine:**

```bash
  https://github.com/anowarzz/bookland-server.git
```

**2. Navigate to the cloned project folder:**

```bash
cd bookland-server
```

**3. Install dependencies:**

```bash
npm install
or
pnpm install
```

**4. Create a .env file in the root directory with the following content:**

```bash
PORT=5000
DATABASE_URL=Here_Your_MongoDB_URL
```

Replace Here_Your_MongoDB_URL with your actual MongoDB database connection URL.

## Running The Application

- **Build the project**

```bash
npm run build
```

- **Start the development server**

```bash
npm run dev

```

## API ENDPOINTS

**POST : Add a book**

```code
/api/books/
```

**Example Request Body:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "FICTION",
  "isbn": "9780743273565",
  "description": "A classic novel about the American Dream",
  "copies": 5,
  "available": true
}
```

**GET : Get all books**

```code
/api/books/
```

**GET : Get a single book**

```code
/api/books/:bookId
```

**PUT : Update a book**

```code
/api/books/:bookId
```

**Example Request Body:**

```json
{
  "copies": 10,
  "available": true
}
```

**DELETE : Delete a book**

```code
/api/books/:bookId
```

**POST : Add a borrow record**

```code
/api/borrow
```

**Example Request Body:**

```json
{
  "book": "60d21b4667d0d8992e610c85",
  "quantity": 1,
  "dueDate": "2025-07-22T00:00:00.000Z"
}
```

**GET : Get the summary of all books borrow records**

```code
/api/borrow
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **Deployment**: Vercel

## Happy Developing! 
