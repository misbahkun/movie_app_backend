import request from 'supertest';
import app from '../app.js';
import { connectDB } from '../config/db.js';
import { User } from '../models/user.model.js';

// Create a Supertest agent to persist cookies across requests
const agent = request.agent(app);

// Connect to the mock MongoDB before all tests
beforeAll(async () => {
  console.log('NODE_ENV:', process.env.NODE_ENV); // Should be 'test'
  console.log('MONGO_URI:', globalThis.__MONGO_URI__); // Should be in-memory URI
  await connectDB(); // Uses globalThis.__MONGO_URI__ from jest-mongodb
});

// Clear the users collection before each test for a clean slate
beforeEach(async () => {
  await User.deleteMany({});
  console.log('Users after cleanup:', await User.countDocuments({})); // Should be 0
});

// Close the DB connection after all tests
afterAll(async () => {
  await User.db.close(); // Closes the in-memory DB connection
});

describe('Auth Routes', () => {
  test('POST /api/v1/auth/signup should create a new user', async () => {
    const response = await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.user).toHaveProperty('email', 'mizzc0d3@gmail.com');
    expect(response.body.user).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('image');
    // Verify cookie is set
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0]).toMatch(/jwt-movie_app=/);
  });

  test('POST /api/v1/auth/signin should log in an existing user', async () => {
    // Create a user first using signup
    await agent
      .post('/api/v1/auth/signup') // Fixed typo from previous /sigin
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });

    const response = await agent
      .post('/api/v1/auth/signin')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.user).toHaveProperty('email', 'mizzc0d3@gmail.com');
    expect(response.body.user).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('image');
    // Verify cookie is set
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0]).toMatch(/jwt-movie_app=/);
  });

  test('POST /api/v1/auth/signin should return 400 for invalid credentials', async () => {
    // Create a user first
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });

    const response = await agent
      .post('/api/v1/auth/signin')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'wrongpassword',
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  test('POST /api/v1/auth/logout should log out the user and clear cookie', async () => {
    // Create a user first
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });

    // Sign in to set the cookie
    const signinResponse = await agent
      .post('/api/v1/auth/signin')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });
    expect(signinResponse.status).toBe(200);
    expect(signinResponse.headers['set-cookie']).toBeDefined();
    expect(signinResponse.headers['set-cookie'][0]).toMatch(/jwt-movie_app=/);

    // Perform logout
    const response = await agent.post('/api/v1/auth/logout');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Logged out successfully');
    // Verify cookie is cleared
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0]).toMatch(/jwt-movie_app=;/); // Empty cookie
  });

  test('GET /api/v1/auth/authCheck should be OK if user is authenticated', async () => {
    // Create a user first
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });

    const signinResponse = await agent
      .post('/api/v1/auth/signin')
      .send({
        email: 'mizzc0d3@gmail.com',
        password: 'password123',
      });
    expect(signinResponse.status).toBe(200);
    expect(signinResponse.body).toHaveProperty('success', true);

    const token = signinResponse.body.user.token

    const response = await agent
      .get('/api/v1/auth/authCheck')
      .set('Authorization', `Bearer ${token}`); // Add Authorization header

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.user).toHaveProperty('email', 'mizzc0d3@gmail.com');
  });
});