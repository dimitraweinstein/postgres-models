import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app.js';
import Beverage from '../lib/models/Beverage.js';

describe('beverage routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a beverage via POST', async () => {
    const beverage = { name: 'water', category: 'nonalcoholic', type: 'healthy' };
    const res = await request(app).post('/api/v1/beverages').send(beverage);

    expect(res.body).toEqual({
      id: '1',
      name: 'water',
      category: 'nonalcoholic',
      type: 'healthy'
    });
  });
}
);
