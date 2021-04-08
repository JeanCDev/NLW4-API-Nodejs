import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveysRepository';
import SurveyUserRepository from '../repositories/SurveyUserRepository';
import UsersRepository from '../repositories/UsersRepository';
import SendMail from '../services/SendMail';
import { resolve } from "path";

export default {

  async execute(req: Request, res: Response){
    const {
      email, survey_id
    } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await usersRepository.findOne({email});

    if (!user){
      return res.status(400).json({
        message: 'User does not exist'
      });
    }

    const survey = await surveyRepository.findOne({id: survey_id});

    if(!survey){
      return res.status(400).json({
        message: 'Surveys does not exist'
      });
    }

    const surveyUserAlreadyExists = await surveyUserRepository
      .findOne({
        where:[
          {user_id: user.id},
          {value: null}
        ],
        relations:["user", "survey"]
      });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: `${process.env.SERVER_URL}answers`
    }

    const path = resolve(
      __dirname, "..","views","emails","npsMail.hbs"
    );

    if(surveyUserAlreadyExists){
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

    

    await SendMail.execute(
      email, 
      survey.title,
      variables,
      path
    );

    return res.status(201).json(surveyUser);
  }

}