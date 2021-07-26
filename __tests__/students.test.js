import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Student from '../lib/models/Student.js';

describe('student routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  it('creates a student via POST', async () => {
    const student = { firstName: 'summer', lastName: 'buckland', status: 'active' };

    const res = await request(app).post('/api/v1/students').send(student);

    expect(res.body).toEqual({
      id: '1',
      ...student
    });
  });
});
