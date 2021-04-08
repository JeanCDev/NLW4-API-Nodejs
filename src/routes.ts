import express from 'express';
import userController from './controllers/UserController';
import surveyController from './controllers/SurveyController';
import sendMailController from './controllers/SendMailController';

const routes = express.Router();

routes.post('/users', userController.create);
routes.post('/surveys', surveyController.create);
routes.get('/surveys', surveyController.show);
routes.post('/send-mail', sendMailController.execute);
routes.post('/answers/:id', sendMailController.execute);
routes.get('/answers', sendMailController.execute);

export default routes;