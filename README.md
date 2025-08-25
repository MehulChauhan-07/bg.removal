# AI Background Removal Tool

An AI-powered web application for effortlessly removing backgrounds from images. This full-stack project features a modern React frontend and a robust Node.js backend, complete with a user authentication system, credit-based usage, and payment integration.

## ✨ Features

-   **AI-Powered Background Removal**: Utilizes the ClipDrop API for high-quality and accurate background removal.
-   **User Authentication**: Secure user sign-up and login managed by Clerk.
-   **Credit System**: Users receive free credits upon signing up and can purchase more to process images.
-   **Payment Integration**: Seamlessly buy credit packs using Razorpay.
-   **Interactive UI**:
    -   Drag-and-drop or browse to upload images.
    -   An interactive slider to compare the original and processed images.
    -   Real-time processing progress indicators.
-   **Download Results**: Save the background-removed image directly from the browser.
-   **Responsive Design**: A clean interface built with Tailwind CSS, suitable for all screen sizes.

## 💻 Technologies Used

**Frontend:**
-   **Framework**: React.js with Vite
-   **Styling**: Tailwind CSS
-   **Routing**: React Router
-   **State Management**: React Context API
-   **Authentication**: Clerk React
-   **HTTP Client**: Axios

**Backend:**
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: Clerk (Webhook for user management)
-   **Image Processing API**: ClipDrop
-   **Payments**: Razorpay
-   **File Handling**: Multer

**Deployment:**
-   Vercel

## 🚀 Getting Started

To run this project locally, follow the steps below.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   MongoDB instance (local or remote URI)

### Environment Variables

Before starting the server, create a `.env` file in the `server/` directory by copying the `.env.example` file. Fill in the required values:

```env
# server/.env

# MongoDB Configuration
MONGO_URL=your_mongodb_connection_string

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# API Keys
CLIPDROP_API_KEY=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

Similarly, create a `.env` file in the `client/` directory for your frontend keys:

```env
# client/.env

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_BACKEND_URL=http://localhost:5000
```

### Server Setup

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000`.

### Client Setup

1.  In a new terminal, navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The client will be available at `http://localhost:5173`.

## ⚙️ How It Works

1.  **User Authentication**: A user signs up or logs in via Clerk. A webhook from Clerk creates a corresponding user entry in the MongoDB database, granting them initial free credits.
2.  **Image Upload**: The user uploads an image through the React frontend.
3.  **API Request**: The frontend sends the image and the user's auth token to the backend Express server.
4.  **Credit Check**: The server verifies the user and checks if they have sufficient credits.
5.  **Background Removal**: If credits are available, the server forwards the image to the ClipDrop API for background removal.
6.  **Update and Respond**: The server deducts one credit from the user's balance, and sends the processed image back to the client.
7.  **Display Result**: The client displays the original and processed images side-by-side with a comparison slider. The user can then download the result.
8.  **Purchasing Credits**: Users can navigate to the pricing page to buy more credits. The transaction is handled by Razorpay, and upon successful payment verification, the user's credit balance is updated.

## Project Structure

The repository is a monorepo containing two main parts:

```
.
├── client/      # React frontend application
└── server/      # Node.js Express backend API
```

-   `client/`: Contains all frontend code, including React components, pages, context for state management, and styling with Tailwind CSS.
-   `server/`: Contains the backend logic, including API routes, controllers for user and image handling, database models, and middleware for authentication and file uploads.
