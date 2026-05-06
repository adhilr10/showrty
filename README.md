# Showrty

Showrty is a URL shortener backend built with Node.js, Express, TypeScript, and MongoDB. It features user authentication, JWT-based sessions, and a comprehensive set of endpoints for managing short links.

## Tech Stack
- Node.js, Express 5, TypeScript
- MongoDB & Mongoose
- JWT (Access, Refresh, Password-reset)
- Nodemailer, Helmet, CORS, Express Rate Limit

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_CONNECTION_URI=mongodb://localhost:27017/showrty

   JWT_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_PASSWORD_RESET_SECRET=your_password_reset_secret

   WHITELISTED_EMAILS=admin@example.com

   SMTP_AUTH_USERNAME=your_smtp_username
   SMTP_AUTH_PASS=your_smtp_password

   LOGTAIL_SOURCE_TOKEN=optional_logtail_token
   LOGTAIL_INGESTING_HOST=optional_logtail_host
   ```

3. **Run the server:**
   ```bash
   npm run dev
   ```

## Key Features & Routes

- **Auth** (`/auth/*`): Register, Login, Logout, Refresh Token, Forgot/Reset Password.
- **User** (`/users/*`): Get, Update, or Delete current user profiles.
- **Links** (`/links/*`): Generate short links (`/generate`), retrieve user links (`/my-links`), update, or delete existing links.
- **Redirects** (`/:backHalf`): Seamless redirection to the original destination URL.

## Security & Performance
The API is secured with role-based access control (User/Admin), HTTP-only refresh token cookies, and API-wide rate limiting to ensure reliability and safe access.
