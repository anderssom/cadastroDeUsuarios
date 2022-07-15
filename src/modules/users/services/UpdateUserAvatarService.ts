import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import Users from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError';

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
}
                @injectable()
export default class UpdateUserAvatarSerice {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) {}

    public async execute({ user_id, avatarFilename }: RequestDTO): Promise<Users> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if (user.avatar) {
            //deleta avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}