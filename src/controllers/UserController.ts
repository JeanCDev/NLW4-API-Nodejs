import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
  async create(req: Request, res: Response){
    const {
      name, email
    } = req.body;
    const usersRepository = getRepository(User);
    const usersAlreadyExist = await usersRepository.findOne({
      email
    });

    if(usersAlreadyExist){
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = usersRepository.create({
      name,
      email
    });

    await usersRepository.save(user);

    return res.json(user);
  },
}
