import { request, Router } from 'express';
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

  .get('/', async (req, res, next) => {
    try {
      const { id } = req.params;
      const owl1 = await Owl.getById(id);

      res.send(owl1);
    } catch (err) {
      next(err);
    }
  });
