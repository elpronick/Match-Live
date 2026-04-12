# Match&Live Test Credentials

## Admin User
- Email: admin@matchlive.com
- Password: Admin123!
- Role: admin

## Test User (create via register)
- Email: test@matchlive.com
- Password: Test123!
- Name: Test User
- City: Madrid
- Budget: 600
- Lifestyle: Social y activo
- Description: Usuario de prueba

## Auth Endpoints
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login
- POST /api/auth/logout - Logout
- GET /api/auth/me - Get current user
- POST /api/auth/refresh - Refresh access token
- PUT /api/auth/profile - Update profile
- POST /api/auth/forgot-password - Forgot password
- POST /api/auth/reset-password - Reset password
- POST /api/saved/{property_id} - Save property
- DELETE /api/saved/{property_id} - Unsave property
- GET /api/saved - Get saved properties
- GET /api/health - Health check
