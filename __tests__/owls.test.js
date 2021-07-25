import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'superagent';
import app from '../lib/app.js';
import Owl from '../lib/models/Owl.js';

describe('owl routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an owl via POST', async () => {
    const owl = { owl: 'burrowing owl', habitat: 'grasslands', threats: 'habitat loss, pesticides' };
    const res = await request(app).post('/api/v1/owls').send(owl);

    expect(res.body).toEqual({
      owl: 'burrowing owl',
      habitat: 'grasslands',
      threats: 'habitat loss, pesticides'
    });
  });
});
