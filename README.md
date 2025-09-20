 📚 BookBuzz – Discover and Share Great Reads!

Welcome to **BookBuzz**, a vibrant mobile app that brings community-powered book recommendations right to your fingertips. Find your next favorite read, share reviews, and connect with fellow book lovers!

![BookBuzz Home](Home.jpg)

---

## 🌟 Features

- Personalized book recommendations tailored by user ratings and reviews
- Seamless image uploads for book covers—powered by Cloudinary
- Secure signup and login with Firebase Authentication
- Vibrant, modern UI designed for intuitive and delightful browsing
- Effortlessly add, rate, and share book recommendations with the community

---

## 🛠️ Built With

- **React Native** – Cross-platform for both iOS & Android
- **JavaScript (ES6+)**
- **Firebase Auth** – Secure user authentication
- **MongoDB** – NoSQL database for storing users and recommendations
- **Cloudinary** – Effortless image storage and CDN delivery
- **Render** – Fast backend deployment

---

## 🎉 Getting Started

### Prerequisites

- Node.js & npm installed
- React Native CLI or Expo CLI
- Firebase and Cloudinary accounts
- MongoDB Atlas (or local MongoDB) setup for database
- (Optional) A Render.com account for backend hosting

### Installation

git clone https://github.com/yourusername/bookbuzz.git
cd bookbuzz
npm install

text

1. Set up your `.env` file at the root:

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MONGODB_URI=your_mongodb_connection_string

text

2. Start the app locally:

npm start

text

Use [Expo Go](https://expo.dev/client) or a simulator to try it out!

---

## ☁️ Deployment

### Backend Deployment on Render

- Push your backend code (Node.js or Express) to GitHub linked with Render.
- Add your environment variables (`FIREBASE_*`, `CLOUDINARY_*`, `MONGODB_URI`) in the Render dashboard.
- Deploy the backend service.
- Backend should establish connection to MongoDB using the `MONGODB_URI`.

### Image Management with Cloudinary

- Users upload book cover images directly to Cloudinary.
- Returned Cloudinary URLs are stored in MongoDB as part of book recommendations.
- This keeps image storage scalable and your backend lightweight.

---

> BookBuzz – Share stories, spark curiosity, grow your community! 📚✨
