import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Beanie from '../lib/models/Beanie.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a beanie babie via POST', async () => {
    const wiser = { name: 'wiser', theme: 'beanie babies', animal: 'bird, owl', releaseYear: 1999 };
    const res = await request(app).post('/api/v1/beanies').send(wiser);

    expect(res.body).toEqual({
      id: '1',
      name: 'wiser',
      theme: 'beanie babies',
      animal: 'bird, owl',
      releaseYear: 1999
    });
  });


});
