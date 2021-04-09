import express from 'express';
import userController from './controllers/UserController';
import surveyController from './controllers/SurveyController';
import sendMailController from './controllers/SendMailController';
import answerController from './controllers/AnswerController';
import npsController from './controllers/NpsController';

const routes = express.Router();

routes.post('/users', userController.create);
routes.post('/surveys', surveyController.create);
routes.get('/surveys', surveyController.show);
routes.post('/send-mail', sendMailController.execute);
routes.get('/answers/:value', answerController.execute);
routes.get('/nps/:survey_id', npsController.execute);

export default routes;