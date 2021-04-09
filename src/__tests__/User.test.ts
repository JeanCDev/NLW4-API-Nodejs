import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../app';

import createConnection from '../database';

describe("Crete user", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    
    const response = await request(app).post('/users').send({
      email: 'user@exemple.com',
      name: 'Jean Carlos das Candongas'
    });
    
    expect(response.status).toBe(201);
  });

  it("should not be able to get all surveys", async () => {

    const response = await request(app).post('/users').send({
      email: 'user@exemple.com',
      name: 'Jean Carlos das Candongas'
    });

    expect(response.status).toBe(400);
  });

});