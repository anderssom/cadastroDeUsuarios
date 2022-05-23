
import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import {sign} from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/Users';

interface Request {
    email: string;
    password: string;
};

//interface Response {}

class AuthenticateUserService {

    public async execute ({ email, password}: Request): Promise<{
        user: User,
        token: String,
        }>{

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne( { where: { email}} );

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);    
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401); 
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
        
        subject: user.id,
        expiresIn,

    });

    return{
        user,
        token,
    };

}
}
export default AuthenticateUserService;