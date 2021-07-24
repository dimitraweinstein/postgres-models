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
  })

  .get('/', async (req, res, next) => {
    try {
      const beverages = await Roots.getAll();
          
      res.send(beverages);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const beverage = await Roots.getById(id);
            
      res.send(beverage);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { album, recordingLabel, releaseYear } = req.body;

      const updatedRootsAlbum = await Roots.updateById(id, { album, recordingLabel, releaseYear });

      res.send(updatedRootsAlbum);
    } catch (err) {
      next(err);
    }
  });
