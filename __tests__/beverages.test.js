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
    
  it('gets all beverages via GET', async () => {
    const water = await Beverage.insert({
      name: 'water',
      category: 'nonalcoholic',
      type: 'healthy'
    });
      
    const beer = await Beverage.insert({
      name: 'beer',
      category: 'alcoholic',
      type: 'fermented'
    });

    const coffee = await Beverage.insert({
      name: 'coffee',
      category: 'nonalcoholic',
      type: 'stimulating'
    });
      
    return request(app)
      .get('/api/v1/beverages')
      .then((res) => {
        expect(res.body).toEqual([water, beer, coffee]);
      });
  });
    
  it('gets a beverage by id via GET', async () => {
    const beverage = {
      id: '1',
      name: 'water',
      category: 'nonalcoholic',
      type: 'healthy'
    };
      
    const res = await request(app).get(`/api/v1/beverages/${beverage.id}`);
      
    expect(res.body).toEqual(beverage);
  });
}
);
