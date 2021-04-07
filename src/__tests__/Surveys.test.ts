import request from 'supertest';
import app from '../app';

import createConnection from '../database';

describe("Crete surveys", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
  });

  it("should be able to create a new survey", async () => {
    
    const response = await request(app).post('/surveys').send({
      title: 'Title',
      description: 'descrição'
    });
    
    expect(response.status).toBe(201);
  });

  it("should not be able to get all surveys", async () => {

    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(1);
  });

});