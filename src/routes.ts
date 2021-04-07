import express from 'express';
import userController from './controllers/UserController';
import surveyController from './controllers/SurveyController';

const routes = express.Router();

routes.post('/users', userController.create);
routes.post('/surveys', surveyController.create);
routes.get('/surveys', surveyController.show);

export default routes;