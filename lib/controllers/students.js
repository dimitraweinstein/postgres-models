import { Router } from 'express';
import Student from '../models/Student.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const student = await Student.insert(req.body);
            
      res.send(student);
    } catch (err) {
      next(err);
    }
  });
