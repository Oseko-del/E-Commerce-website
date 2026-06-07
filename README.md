# Alpha Personnel Care Solution

A complete, production-ready MERN stack e-commerce web application with a Navy Blue & White theme. It allows standard users to purchase products, place orders, and write reviews, while admins can manage the product catalog and view orders.

## Technologies Used

- **Frontend**: React.js, Vite, Tailwind CSS (v4), React Router, Context API, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcrypt.

## Prerequisites

- Node.js installed on your machine.
- MongoDB installed locally or a MongoDB cluster string (e.g., MongoDB Atlas).

## Getting Started

### 1. Database Setup

1. Make sure you have MongoDB running locally on port `27017` or use an external URI.
2. In the `server/.env` file, change `MONGO_URI` if you are using an external database. The default expects a local instance at `mongodb://localhost:27017/alpha_personnel`.

### 2. Dependency Installation

The project uses two separate folders for the frontend (`client`) and backend (`server`).

Install backend dependencies:
```bash
cd server
npm install
```

Install frontend dependencies:
```bash
cd client
npm install
```

*(Note: Tailwind CSS v4 and the Vite plugin are used for styling).*

### 3. Environment Variables

Inside the `server/` folder, ensure the `.env` file exists with the following properties:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/alpha_personnel
JWT_SECRET=supersecretkey_alpha_personnel_2026
```

### 4. Running the Application Locally

You can launch both the frontend and backend servers together directly from the `server` directory using `concurrently`.

Run the following command from the `server/` directory:
```bash
npm run dev:all
```

- **Backend** will be running at `http://localhost:5000`
- **Frontend** will be running at `http://localhost:5173`

The frontend automatically proxies logic to the backend via Axios configurations.

### 5. Admin Access

The first user created through the application's `/register` page will automatically be assigned **Admin Rights**. 
1. Open the app in your browser (`http://localhost:5173`).
2. Go to "Login Here" -> "Register Here".
3. Sign up with a set email and password.
4. You will now see an **Admin Dashboard** option under your name dropdown menu on the top right.
5. In the Admin Dashboard, you can add mock products to test out the store system.

## Features Encompassed
- Custom Authentication system using JWT middleware.
- Full shopping cart state management (Context API + LocalStorage + MongoDB binding).
- Beautiful product grids and details tailored for Skincare and Hygiene solutions.
- Responsive design tailored for Desktop and Mobile viewpoints.
