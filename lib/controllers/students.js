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
  })

  .get('/', async (req, res, next) => {
    try {
      const students = await Student.getAll();

      res.send(students);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await Student.getById(id);

      res.send(student);
    } catch (err) {
      next(err);
    }
  });
