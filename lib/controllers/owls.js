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
  });
