const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  let server; // Declare a variable to hold the server instance

  beforeAll(() => {
    // Start the server before running tests
    server = app.listen(3000);
  });

  afterAll((done) => {
    // Close the server after all tests are done
    server.close(done);
  });

  it('responds with "Hello World"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});
