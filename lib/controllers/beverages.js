import { Router } from 'express';
import Beverage from '../models/Beverage.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const beverage = await Beverage.insert(req.body);
            
      res.send(beverage);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const beverages = await Beverage.getAll();
         
      res.send(beverages);
    } catch (err) {
      next(err);
    } 
  });
