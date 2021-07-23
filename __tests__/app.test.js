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
    const beanie = { name: 'wiser', theme: 'beanie babies', animal: 'bird, owl', releaseYear: 1999 };
    const res = await request(app).post('/api/v1/beanies').send(beanie);

    expect(res.body).toEqual({
      id: '1',
      name: 'wiser',
      theme: 'beanie babies',
      animal: 'bird, owl',
      releaseYear: 1999
    });
  });

  it('gets all beanie babies via GET', async () => {
    const wiser = await Beanie.insert({
      name: 'wiser',
      theme: 'beanie babies',
      animal: 'bird, owl',
      releaseYear: 1999
    });

    const miami = await Beanie.insert({
      name: 'miami the bear',
      theme: 'beanie babies',
      animal: 'bear',
      releaseYear: 2006
    });

    const sniffer = await Beanie.insert({
      name: 'sniffer',
      theme: 'beanie babies',
      animal: 'dog',
      releaseYear: 2000
    });

    return request(app)
      .get('/api/v1/beanies')
      .then((res) => {
        expect(res.body).toEqual([wiser, miami, sniffer]);
      });
  });

  it('gets a beanie babie by id via GET', async () => {
    const beanie = await Beanie.insert({
      id: '1',
      name: 'wiser',
      theme: 'beanie babies',
      animal: 'bird, owl',
      releaseYear: 1999
    });

    const res = await request(app).get(`/api/v1/beanies/${beanie.id}`);

    expect(res.body).toEqual(beanie);
  });

  it('updates a beanie babie via PUT', async () => {
    const beanie = await Beanie.insert({
      id: '1',
      name: 'wiser',
      theme: 'beanie babies',
      animal: 'bird, owl',
      releaseYear: 1999
    });

    const res = await request(app)
      .put(`/api/v1/beanies/${beanie.id}`)
      .send({ releaseYear: 2001 });

    expect(res.body).toEqual({ ...beanie, releaseYear: 2001 });
  });

  it('deletes a beanie babie via DELETE', async () => {
    const beanie = await Beanie.insert({
      id: '1',
      name: 'wiser',
      theme: 'beanie babies',
      animal: 'bird, owl',
      releaseYear: 1999
    });

    const res = await request(app).delete(`/api/v1/beanies/${beanie.id}`);
    
    expect(res.body).toEqual({
      message: `${beanie.name} has been deleted from your collection!`
    });
  });
}
);
