# MovieHub Backend

A robust backend service for a modern streaming platform built with Node.js, Express, and MongoDB. This service provides APIs for user authentication, movie/TV show browsing, search functionality, and integrates with TMDB API for content.

## 🚀 Features

- 👤 User Authentication (JWT)
- 🎬 Movie & TV Show Data via TMDB API
- 🔍 Search Functionality
- 📝 User Search History
- 🔒 Protected Routes
- 🌐 Proxy Support for Development
- 🐳 Docker Support

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **External API:** TMDB API
- **Containerization:** Docker & Docker Compose
- **Reverse Proxy:** Nginx

## 📋 Prerequisites

- Node.js v18 or higher
- MongoDB
- Docker & Docker Compose (optional)
- TMDB API Key

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/mahdinazmi/Backend-Netflix.git
   cd Backend-Netflix
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The server will start at http://localhost:5000

## 🐳 Docker Setup

### Development

```bash
# Build and start containers
docker-compose -f docker-compose.yml up --build

# Stop containers
docker-compose down
```

### Production

```bash
# Build and start containers
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 📁 Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # External services
├── utils/          # Utility functions
└── server.js       # Entry point
```

## 🔑 Environment Variables

Required environment variables:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/netflix
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

## 🔒 Authentication

- JWT-based authentication
- Tokens expire in 15 days
- HTTP-only cookies for token storage
- CSRF protection enabled

## 📚 API Documentation

Detailed API documentation is available in [/docs/API.md](docs/API.md)

## 🧪 Development Features

- Hot reloading with nodemon
- Environment-specific configurations
- Proxy support for development
- Error handling middleware
- MongoDB connection management

## 🚀 Production Features

- Docker containerization
- Nginx reverse proxy
- Environment-based configurations
- Static file serving
- Security headers
- Health checks

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `npm run dev`: Start development server with nodemon
- `npm run prod`: Start production server
- `docker-compose up`: Start all services with Docker
- `docker-compose down`: Stop all Docker services

## 🔐 Security Features

- HTTP-only cookies
- CSRF protection
- Secure password hashing
- Protected routes
- Input validation
- XSS protection
- Rate limiting (via Nginx)

## 📜 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for movie and TV show data
- Modern streaming platforms for inspiration
