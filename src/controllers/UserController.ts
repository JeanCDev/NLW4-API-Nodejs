import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import * as yup from 'yup';
import AppError from '../errors/AppError';

export default {

  /**
   * Cria um novo usuário
   * @param Request - passando name e email
   * @param Response - Que retorna a resposta ao usuário
   * */
  async create(req: Request, res: Response){
    const {
      name, email
    } = req.body;

    const schema = yup.object().shape({
      name: yup
              .string()
              .required("Name can't be null"),
      email: yup
              .string()
              .email("Must be a valid email")
              .required("Email is required")
    });

    try{
      await schema.validate(req.body, {abortEarly: false});
    } catch (err) {
      return res.status(400).json({
        error: err
      });
    }
    

    const usersRepository = getCustomRepository(UsersRepository);
    const userAlreadyExist = await usersRepository.findOne({
      email
    });

    if(userAlreadyExist){
      throw new AppError("User already exist");
    }

    const user = usersRepository.create({
      name,
      email
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
  },
}
