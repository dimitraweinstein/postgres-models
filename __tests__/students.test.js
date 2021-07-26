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
      firstName: 'summer',
      lastName: 'buckland',
      status: 'active'
    });
  });

  it('gets all students via GET', async () => {
    const summer = await Student.insert({
      id: '1',
      firstName: 'summer',
      lastName: 'buckland',
      status: 'active'
    });

    const janet = await Student.insert({
      id: '2',
      firstName: 'janet',
      lastName: 'blackwood',
      status: 'active'
    });

    const mark = await Student.insert({
      id: '3',
      firstName: 'mark',
      lastName: 'kooy',
      status: 'inactive'
    });

    return request(app)
      .get('/api/v1/students')
      .then((res) => {
        expect(res.body).toEqual([summer, janet, mark]);
      });
  });

  it('gets one student by id via GET', async () => {
    const summer = await Student.insert({
      id: '1',
      firstName: 'summer',
      lastName: 'buckland',
      status: 'active'
    });

    const res = await request(app).get(`/api/v1/students/${summer.id}`);

    expect(res.body).toEqual(summer);
  });
});
