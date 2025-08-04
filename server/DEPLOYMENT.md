# Deployment Guide for Background Removal Server

## Vercel Deployment Setup

### Prerequisites

1. A Vercel account
2. Your project connected to a Git repository (GitHub, GitLab, or Bitbucket)
3. Environment variables configured

### Environment Variables

Make sure to set the following environment variables in your Vercel dashboard:

```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
PORT=5000
```

Add any additional API keys you need:

```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
JWT_SECRET=your_jwt_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

### Deployment Steps

1. **Push your code to your Git repository**

   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository
   - Set the project root to `/server`
   - Add your environment variables
   - Deploy

3. **Configure your frontend**
   Update your frontend to use the new API URL:
   ```javascript
   const API_URL = "https://your-server-name.vercel.app/api";
   ```

### API Endpoints

After deployment, your API will be available at:

- Base URL: `https://your-server-name.vercel.app`
- Health check: `https://your-server-name.vercel.app/api/health`
- User webhook: `https://your-server-name.vercel.app/api/user/webhook`

### Troubleshooting

1. **Check Vercel Function Logs**

   - Go to your Vercel dashboard
   - Click on your project
   - Go to the "Functions" tab
   - Check the logs for any errors

2. **Common Issues**

   - Make sure all environment variables are set
   - Ensure MongoDB connection string is correct
   - Check that all imports use ES6 module syntax
   - Verify CORS settings allow your frontend domain

3. **Local Testing**
   ```bash
   npm run dev
   ```

### File Structure

```
server/
├── api/
│   └── index.js          # Main serverless function
├── config/
│   └── mongodb.js        # Database configuration
├── controllers/
│   └── userController.js # Route controllers
├── models/
│   └── userModel.js      # Database models
├── routes/
│   └── userRoutes.js     # API routes
├── package.json          # Dependencies and scripts
├── vercel.json          # Vercel configuration
└── .env.example         # Environment variables template
```
