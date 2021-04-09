import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveysRepository';
import SurveyUserRepository from '../repositories/SurveyUserRepository';
import UsersRepository from '../repositories/UsersRepository';
import SendMail from '../services/SendMail';
import { resolve } from "path";
import AppError from '../errors/AppError';

export default {

  /**
   * Envia um email ao usuário 
   * @param Request - passando um email e id da pesquisa
   * */
  async execute(req: Request, res: Response){
    const {
      email, survey_id
    } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await usersRepository.findOne({email});

    if (!user){
      throw new AppError("User does not exist");
    }

    const survey = await surveyRepository.findOne({id: survey_id});

    if(!survey){
      throw new AppError("Survey does not exist");
    }

    const surveyUserAlreadyExists = await surveyUserRepository
      .findOne({
        where:[
          {user_id: user.id,
          value: null}
        ],
        relations:["user", "survey"]
      });

    const path = resolve(
      __dirname, "..","views","emails","npsMail.hbs"
    );

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: `${process.env.SERVER_URL}answers`
    }

    if(surveyUserAlreadyExists){
      variables.id = surveyUserAlreadyExists.id

      await SendMail.execute(
        email, 
        survey.title,
        variables,
        path
      );

      return res.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveyUserRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await SendMail.execute(
      email, 
      survey.title,
      variables,
      path
    );

    return res.status(201).json(surveyUser);
  }

}