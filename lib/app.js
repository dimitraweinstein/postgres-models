import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import beaniesController from './controllers/beanies.js';
import beveragesController from './controllers/beverages.js';
import rootsController from './controllers/roots.js';
import owlsController from './controllers/owls.js';
// import studentsController from './controllers/students.js';

const app = express();

app.use(express.json());

app.use('/api/v1/beanies', beaniesController);
app.use('/api/v1/beverages', beveragesController);
app.use('/api/v1/roots', rootsController);
app.use('/api/v1/owls', owlsController);
// app.use('/api/v1/students', studentsController);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
