const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds properly', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the API! Please visit /api-docs to see our documentation.');
  });
});
