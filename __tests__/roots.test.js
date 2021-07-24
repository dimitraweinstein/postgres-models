import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Roots from '../lib/models/Roots.js';


describe('roots albums routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a roots album via POST', async () => {
    const album = { album: 'things fall apart', recordingLabel: 'mca records', releaseYear: 1999 };

    const res = await request(app).post('/api/v1/roots').send(album);

    expect(res.body).toEqual({
      id: '1',
      album: 'things fall apart',
      recordingLabel: 'mca records',
      releaseYear: 1999
    });
  });
    
  it('gets all roots albums via GET', async () => {
    const album1 = await Roots.insert({
      id: '1',
      album: 'things fall apart',
      recordingLabel: 'mca records',
      releaseYear: 1999
    });
      
    const album2 = await Roots.insert({
      id: '2',
      album: 'phrenology',
      recordingLabel: 'mca records',
      releaseYear: 2002
    });
      
    const album3 = await Roots.insert({
      id: '3',
      album: 'the tipping point',
      recordingLabel: 'geffen records',
      releaseYear: 2004
    });
      
    return request(app)
      .get('/api/v1/roots')
      .then((res) => {
        expect(res.body).toEqual([album1, album2, album3]);
      });
  });
    
  it('gets an album by id via GET', async () => {
    const album1 = await Roots.insert({
      id: '1',
      album: 'things fall apart',
      recordingLabel: 'mca records',
      releaseYear: 1999
    });
      
    const res = await request(app).get(`/api/v1/roots/${album1.id}`);

    expect(res.body).toEqual(album1);
  });
    
  it('updates each album by id via PUT', async () => {
    const album1 = await Roots.insert({
      id: '1',
      album: 'things fall apart',
      recordingLabel: 'mca records',
      releaseYear: 1999
    });

    const res = await request(app)
      .put(`/api/v1/roots/${album1.id}`)
      .send({ recordingLabel: 'def jam' });
        
    expect(res.body).toEqual({ ...album1, recordingLabel: 'def jam' });
  });
});
