# Book Buzz App

Book Buzz is a React Native mobile application that provides personalized book recommendations to users based on their ratings. It features secure user authentication, dynamic rating-based suggestions, and a modern, responsive UI aimed at enhancing user engagement.

## Features

- User authentication via Firebase Authentication (email/password)
- Personalized book recommendations based on user ratings
- Responsive and intuitive UI for both iOS and Android
- Cloudinary integration for efficient book cover image storage and management
- Backend deployment with Render for scalable backend services

## Technology Stack

- React Native
- JavaScript (ES6+)
- Firebase Authentication
- Cloudinary for image hosting
- Render for backend deployment

## Getting Started

### Prerequisites

- Node.js and npm installed
- React Native CLI or Expo CLI installed
- Firebase project with Authentication enabled
- Cloudinary account for image uploading
- Render account for backend deployment

### Installation

1. Clone the repository

git clone https://github.com/yourusername/book-buzz-app.git
cd book-buzz-app

text

2. Install dependencies

npm install

text

3. Set up environment variables

Create a `.env` file in the root folder with:

FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

text

### Running Locally

Start the development server:

npm start

text

Open the app with Expo Go on your device or an emulator.

## Deployment

### Backend on Render

1. Push the backend code to a GitHub repository.
2. Create a new Web Service on Render linked to the backend repo.
3. Add required environment variables (Firebase and Cloudinary keys) in Render dashboard.
4. Deploy the backend service.

### Handling Images with Cloudinary

- Images (book covers) are uploaded directly to Cloudinary via the app.
- URLs returned by Cloudinary are saved in your database.
- This improves scalability and reduces server load.
