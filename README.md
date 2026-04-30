# Showrty

Showrty is an Express + TypeScript backend for a URL shortener project. The current API includes user authentication, refresh-token sessions, password reset by email, and current-user profile management.

## Tech Stack

- Node.js, Express 5, TypeScript
- MongoDB with Mongoose
- JWT access, refresh, and password-reset tokens
- HTTP-only refresh-token cookies
- Nodemailer for password-reset emails
- Helmet, CORS, compression, and rate limiting

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

Create a `.env` file in the project root:

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

### 3. Run the development server

```bash
npm run dev
```

The server runs at:

```txt
http://localhost:<PORT>
```

## API Overview

Base URL:

```txt
http://localhost:5000
```

Health routes:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Basic server response |
| `GET` | `/` through API router | Returns API status/version after database connection |

## Authentication Details

Showrty uses two JWT token types for login sessions:

- **Access token**: returned in the response body and expires in `30m`.
- **Refresh token**: stored in a `refreshToken` cookie and expires in `7d`.

Protected routes require the access token in the `Authorization` header:

```txt
Authorization: Bearer <accessToken>
```

The refresh token is read from cookies when requesting a new access token.

## Auth Endpoints

### Register

```http
POST /auth/register
```

Creates a new user and returns an access token. Also sets a `refreshToken` cookie.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

Allowed roles:

- `user`
- `admin`

Admin registration is only allowed when the email exists in `WHITELISTED_EMAILS`.

Success response:

```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "passwordResetToken": null,
    "role": "user"
  },
  "accessToken": "jwt_access_token"
}
```

### Login

```http
POST /auth/login
```

Logs in an existing user, returns a new access token, and sets a new `refreshToken` cookie.

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "accessToken": "jwt_access_token"
}
```

### Refresh Access Token

```http
GET /auth/refreshToken
```

Returns a new access token using the `refreshToken` cookie.

Success response:

```json
{
  "accessToken": "new_jwt_access_token"
}
```

Common errors:

- `401 RefreshTokenExpired`
- `401 RefreshTokenError`
- `401 Unauthorized` when the cookie is missing

### Logout

```http
DELETE /auth/logout
```

Requires authentication. Clears the saved refresh token and removes the `refreshToken` cookie.

Headers:

```txt
Authorization: Bearer <accessToken>
```

Success response:

```txt
204 No Content
```

### Forgot Password

```http
POST /auth/forget-password
```

Sends a password-reset email to the user.

Request body:

```json
{
  "email": "john@example.com"
}
```

Success response:

```txt
204 No Content
```

### Reset Password

```http
POST /auth/reset-password?token=<passwordResetToken>
```

Resets the user password using the password-reset token from email.

Request body:

```json
{
  "password": "newPassword123"
}
```

Success response:

```txt
204 No Content
```

Common errors:

- `401 TokenExpired`
- `401 InvalidToken`
- `404 TokenNotFound`

## User Endpoints

All user endpoints require:

```txt
Authorization: Bearer <accessToken>
```

### Get Current User

```http
GET /users/current
```

Returns the logged-in user.

### Update Current User

```http
PATCH /users/current
```

Updates the logged-in user.

Request body examples:

```json
{
  "name": "John Updated"
}
```

```json
{
  "email": "new-email@example.com"
}
```

```json
{
  "current_password": "password123",
  "new_password": "newPassword123"
}
```

Changing `role` is not allowed from this endpoint.

### Delete Current User

```http
DELETE /users/current
```

Deletes the logged-in user.

Success response:

```txt
204 No Content
```

## Validation Rules

- `name` is required during registration.
- `email` must be a valid email address.
- `password` must be at least 8 characters.
- `role` must be either `user` or `admin`.
- Duplicate emails are rejected.
- Admin accounts require whitelisted emails.

## Rate Limits

The API uses a 1-hour rate-limit window:

| Type | Limit |
| --- | --- |
| Basic routes | `100` requests/hour |
| Auth login | `10` requests/hour |
| Password reset | `3` requests/hour |

## Current Shortener Status

The project is named and structured for a link shortener, but short-link creation, redirect, analytics, and link-management endpoints are not present yet in the current codebase.
