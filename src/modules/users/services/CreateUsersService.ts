//criptografia de senha
import { hash } from 'bcryptjs';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import Users from '@modules/users/infra/typeorm/entities/Users';


interface Request {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) {}

   public async execute({ name, email, password}:Request): Promise<Users> {

       const checkUserExists = await this.usersRepository.findByEmail(email);

       if (checkUserExists) {
           throw new  AppError('Email address already used.');
       }
       //cripitografia de senha 
       const hashedPassword = await hash(password, 8);

       const user = await this.usersRepository.create({
           name,
           email,
           password: hashedPassword,
       });

       return user;

   } 

}

export default CreateUserService;