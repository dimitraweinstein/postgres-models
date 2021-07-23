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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const beanie = await Beanie.getById(id);

      res.send(beanie);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, theme, animal, releaseYear } = req.body;
        
      const updatedBeanie = await Beanie.updateById(id, { name, theme, animal, releaseYear });
            
      res.send(updatedBeanie);
    } catch (err) {
      next(err);
    }
  })
    
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const beanie = await Beanie.deleteById(id);

      res.send({
        message: `${beanie.name} has been deleted from your collection!`
      });
    } catch (err) {
      next(err);
    }
  })
;




