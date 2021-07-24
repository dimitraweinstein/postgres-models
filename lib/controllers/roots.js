import { Router } from 'express';
import Roots from '../models/Roots.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const album = await Roots.insert(req.body);

      res.send(album);
    } catch (err) {
      next(err);
    }   
  });
