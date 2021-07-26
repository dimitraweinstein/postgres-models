import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Owl from '../lib/models/Owl.js';

describe('Owls routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an owl via POST', async () => {
    const owl = { owl: 'burrowing owl', habitat: 'grasslands', threats: 'habitat loss, pesticides' };

    const res = await request(app).post('/api/v1/owls').send(owl);

    expect(res.body).toEqual({
      id: '1',
      ...owl
    });

  });

  it('gets all owls via GET', async () => {
    const owl1 = await Owl.insert({
      id: '1',
      owl: 'burrowing owl',
      habitat: 'grasslands',
      threats: 'habitat loss, pesticides'
    });

    const owl2 = await Owl.insert({
      id: '2',
      owl: 'eastern screech-owl',
      habitat: 'eastern forests',
      threats: 'deforestation'
    });

    const owl3 = await Owl.insert({
      id: '3',
      owl: 'elf owl',
      habitat: 'desert scrub',
      threats: 'habitat loss'
    });

    return request(app)
      .get('/api/v1/owls')
      .then((res) => {
        expect(res.body).toEqual([owl1, owl2, owl3]);
      });
  });

  it('gets one owl by id', async() => {
    const owl = await Owl.insert({
      id: '1',
      owl: 'burrowing owl',
      habitat: 'grasslands',
      threats: 'loss of habitat, pesticides'
    });

    const res = await request(app).get(`/api/v1/owls/${owl.id}`);

    expect(res.body).toEqual({
      id: '1',
      owl: 'burrowing owl',
      habitat: 'grasslands',
      threats: 'loss of habitat, pesticides'
    });
  });

});
