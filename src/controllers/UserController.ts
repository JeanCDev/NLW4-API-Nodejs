import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

export default {
  async create(req: Request, res: Response){
    const {
      name, email
    } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const userAlreadyExist = await usersRepository.findOne({
      email
    });

    if(userAlreadyExist){
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = usersRepository.create({
      name,
      email
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
  },
}
