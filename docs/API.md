# Netflix Clone Backend API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
All API requests except authentication endpoints require the JWT token to be included in the request header:
```
Authorization: Bearer <token>
```

## Response Format
All endpoints return responses in the following format:
```json
{
  "success": boolean,
  "content": Object | Array | null,
  "message": string (optional)
}
```

## Authentication Endpoints

### Sign Up
```http
POST /auth/signup
```
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "image": "/avatar1.png",
    "searchHistory": [],
    "token": "jwt_token"
  }
}
```

### Sign In
```http
POST /auth/signin
```
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "image": "/avatar1.png",
    "searchHistory": [],
    "token": "jwt_token"
  }
}
```

### Logout
```http
POST /auth/logout
```
Logout and clear authentication cookie.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Auth Check
```http
GET /auth/authCheck
```
Verify authentication status.

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "image": "/avatar1.png",
    "searchHistory": []
  }
}
```

## Movie Endpoints

### Get Trending Movies
```http
GET /movie/trending
```
Get a list of trending movies (limited to 5).

**Response:**
```json
{
  "success": true,
  "content": [
    {
      "id": "movie_id",
      "title": "Movie Title",
      "overview": "Movie Description",
      "poster_path": "/path/to/poster.jpg",
      "backdrop_path": "/path/to/backdrop.jpg"
    }
  ]
}
```

### Get Now Playing Movies
```http
GET /movie/nowplaying
```
Get currently playing movies in theaters.

### Get Movie Details
```http
GET /movie/:id/details
```
Get detailed information about a specific movie.

### Get Movie Trailer
```http
GET /movie/:id/trailer
```
Get trailer information for a specific movie.

### Get Similar Movies
```http
GET /movie/:id/similar
```
Get a list of similar movies.

### Get Movie Recommendations
```http
GET /movie/:id/recommendations
```
Get movie recommendations based on a specific movie.

### Get Movies by Category
```http
GET /movie/:category
```
Get movies by category (e.g., popular, top_rated, upcoming).

## TV Show Endpoints

### Get Trending TV Shows
```http
GET /tv/trending
```
Get a random trending TV show.

### Get Popular TV Shows
```http
GET /tv/popular
```
Get popular TV shows.

### Get TV Show Details
```http
GET /tv/:id/details
```
Get detailed information about a specific TV show.

### Get TV Show Trailers
```http
GET /tv/:id/trailers
```
Get trailers for a specific TV show.

### Get Similar TV Shows
```http
GET /tv/:id/similar
```
Get a list of similar TV shows.

### Get TV Show Recommendations
```http
GET /tv/:id/recommendations
```
Get TV show recommendations.

### Get TV Show Keywords
```http
GET /tv/:id/keywords
```
Get keywords associated with a TV show.

### Get TV Shows by Category
```http
GET /tv/:category
```
Get TV shows by category.

## Search Endpoints

### Search Movies
```http
GET /search/movie/:query
```
Search for movies by query string.

**Response:**
```json
{
  "success": true,
  "content": [
    {
      "id": "movie_id",
      "title": "Movie Title",
      "overview": "Movie Description",
      "poster_path": "/path/to/poster.jpg"
    }
  ]
}
```

### Search TV Shows
```http
GET /search/tv/:query
```
Search for TV shows by query string.

### Search People
```http
GET /search/person/:query
```
Search for people (actors, directors, etc.) by query string.

### Get Search History
```http
GET /search/history
```
Get user's search history.

**Response:**
```json
{
  "success": true,
  "content": [
    {
      "id": "item_id",
      "image": "/path/to/image.jpg",
      "title": "Search Item Title",
      "searchType": "movie|tv|person",
      "createdAt": "timestamp"
    }
  ]
}
```

### Remove from Search History
```http
DELETE /search/history/:id
```
Remove an item from search history.

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error description"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized - No Token Provided"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## Environment Variables
Required environment variables:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/netflix
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

## Rate Limiting
- No explicit rate limiting implemented
- Depends on TMDB API rate limits

## Authentication Notes
- JWT token expires in 15 days
- Token is stored in HTTP-only cookie
- CSRF protection enabled with SameSite=Strict
- Secure cookie in production environment
