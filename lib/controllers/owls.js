import { Router } from 'express';
import Owl from '../models/Owl.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const owl = await Owl.insert(req.body);

      res.send(owl);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const owls = await Owl.getAll();

      res.send(owls);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const owl = await Owl.getById(id);

      res.send(owl);
    } catch (err) {
      next(err);
    }
  })
  
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { owl, habitat, threats } = req.body;
      const updatedOwl = Owl.updateById(id, { owl, habitat, threats });

      res.send(updatedOwl);
    } catch (err) {
      next(err);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const owl = await Owl.deleteById(id);
      
      res.send({
        message: `${owl.owl} has been deleted!`
      });
    } catch (err) {
      next(err);
    }
  });
