
# 👋 Hi, I'm Sydney Oseko Juma
[![Portfolio](https://img.shields.io/badge/Portfolio-sydneyoseko.netlify.app-FF6B35?style=for-the-badge&logo=netlify&logoColor=white)](https://sydneyoseko.netlify.app)
[![Twitter](https://img.shields.io/badge/Twitter-@Oseko__17-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/Oseko_17)
[![Gmail](https://img.shields.io/badge/Gmail-osekosydney@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:osekosydney@gmail.com)

---

##  About Me
IT Student & Web Developer passionate about building practical solutions through code and technology. Currently studying BSc Information Technology at Technical University of Mombasa.

---

## 🛠 Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Adobe Premiere Pro](https://img.shields.io/badge/Premiere_Pro-9999FF?style=for-the-badge&logo=Adobe-Premiere-Pro&logoColor=white)
![After Effects](https://img.shields.io/badge/After_Effects-9999FF?style=for-the-badge&logo=Adobe-After-Effects&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)

---

## 📂 Featured Projects

| Project | Description | Stack |
|---|---|---|
| 🛒 Ndovu POS | Point of Sale system for retail management | Python, SQLite |
|  Pharmacy Website | AI-powered chatbot for prescription help | Flask, Gemini API |
| 🛍 Alpha E-commerce | Full e-commerce platform like Jumia | Javascript, HTML/CSS |
| 🤖 Self-Hosted AI Agent | Local AI pipeline without cloud APIs | Python, n8n |

---


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
