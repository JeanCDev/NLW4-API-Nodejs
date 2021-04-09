import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

export default {

  //http://localhost:3000/answers/1?u=d0b507a0-4b6c-4d30-8667-d3284b794af3
  /**
   * Executa a resposta do usuário
   * @Param Response
   * @Param Request
   * */
  async execute (req: Request, res: Response){
    const {value} = req.params;
    const {u} = req.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u)
    });

    if(!surveyUser){
      throw new AppError("Survey user does nor exist");
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return res.status(200).json(surveyUser);
  }
}