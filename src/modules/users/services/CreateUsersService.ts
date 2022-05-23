import { getRepository } from 'typeorm';
//criptografia de senha
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import Users from '@modules/users/infra/typeorm/entities/Users';


interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
   public async execute({ name, email, password}:Request): Promise<Users> {
       const usersRepository = getRepository(Users);

       const checkUserExists = await usersRepository.findOne({
           where: { email },

       });

       if (checkUserExists) {
           throw new  AppError('Email address already used.');
       }
       //cripitografia de senha 
       const hashedPassword = await hash(password, 8);

       const user = usersRepository.create({
           name,
           email,
           password: hashedPassword,
       });

       await usersRepository.save(user);

       return user;

   } 

}

export default CreateUserService;