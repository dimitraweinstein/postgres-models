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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
        
      const beverage = await Beverage.getById(id);

      res.send(beverage);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, category, type } = req.body;

      const updatedBeverage = await Beverage.updateById(id, { name, category, type });

      res.send(updatedBeverage);
    } catch (err) {
      next(err);
    }
  });
