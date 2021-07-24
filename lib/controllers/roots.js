import { Router } from 'express';
import { NEXT } from 'symbol-tree/lib/TreeIterator';
import Roots from '../models/Roots.js';

export default Router()
  .post('/', async () => {
    try {
      const album = await Roots.insert(req.body);

      res.send(album);
    } catch (err) {
      NEXT(err);
    }   
  });
