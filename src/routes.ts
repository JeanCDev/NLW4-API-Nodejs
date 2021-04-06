import express from 'express';
import userController from './controllers/UserController';

const routes = express.Router();

routes.post('/users', userController.create);

export default routes;