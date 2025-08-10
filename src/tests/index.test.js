import request from 'supertest';
import app from '../app.js';

describe('index route', () => {
  it('should return 200 OK and Text WELCOME TO API MOVIE TMDB', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('WELCOME TO API MOVIE TMDB')
  });
})
