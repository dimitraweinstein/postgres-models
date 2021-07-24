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
});
