import request from 'supertest';
import { newDb } from 'pg-mem';
import { Pool } from 'pg';

const db = newDb();

jest.mock('../db', () => {
  const { newDb } = require('pg-mem');
  const db = newDb();
  
  const adapter = db.adapters.createPg();
  const pool = new adapter.Pool();

  return {
    query: (text: string, params?: any[]) => pool.query(text, params),
    end: () => pool.end(),
    _memDb: db 
  };
});

import app from '../app';
import * as dbModule from '../db';


beforeAll(async () => {

    const memDb = (dbModule as any)._memDb;
    
    await memDb.public.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            is_completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
});

afterAll(async () => {
    jest.clearAllMocks();
});


describe('Task API Integration Tests (pg-mem)', () => {
  const apiKey = 'moj-tajny-klucz-api-123';
  process.env.API_KEY = apiKey; 

  it('Example: Should be unauthorized without API key', async () => {

    const res = await request(app).get('/tasks');
    expect(res.status).toBe(401);
  });

  let createdTaskId: number;

  it('Example: Should create a new task', async () => {
    const newTask = {
      title: 'Test Integration Task',
      description: 'Testing via Jest and Supertest'
    };

    const res = await request(app)
      .post('/tasks')
      .set('x-api-key', apiKey)
      .send(newTask);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newTask.title);
    
    createdTaskId = res.body.id;
  });

  it('Example: Should retrieve the created task', async () => {
    const res = await request(app)
      .get(`/tasks/${createdTaskId}`)
      .set('x-api-key', apiKey);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdTaskId);
    expect(res.body.title).toBe('Test Integration Task');
  });

  it('Example: Should delete the task', async () => {
    const res = await request(app)
      .delete(`/tasks/${createdTaskId}`)
      .set('x-api-key', apiKey);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully');
  });

  it('Example: Should return 404 for deleted task', async () => {
    const res = await request(app)
        .get(`/tasks/${createdTaskId}`)
        .set('x-api-key', apiKey);
    
    expect(res.status).toBe(404);
  });
});
