import { Router } from 'express';
import Owl from '../models/Owl.js';

export default Router()
  .post('/', async (req, res, next) => {
    console.log('this is a post route');
    try {
      console.log('we are in the try block now');

      const owl = await Owl.insert(req.body);

      console.log('we have inserted the owl');

      res.send(owl);
    } catch (err) {
      console.log('catch block!!!');
      next(err);
    }
  });
