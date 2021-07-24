import { Router } from 'express';
import RootsAlbums from '../models/RootsAlbums.js;';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const album = await RootsAlbums.insert(req.body);

      res.send(album);
    } catch (err) {
      next(err);
    }
  });
