import { Router } from 'express';
import Beanie from '../models/Beanie.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const beanie = await Beanie.insert(req.body);

      res.send(beanie);
    } catch (err) {
      next(err);
    }
  })
    
  .get('/', async (req, res, next) => {
    try {
      const beanies = await Beanie.getAll();

      res.send(beanies);
    } catch (err) {
      next(err);
    }
  });
