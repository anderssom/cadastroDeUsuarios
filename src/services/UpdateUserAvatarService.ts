import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Users from '../models/Users';
import uploadConfig from '../config/upload'

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarSerice {
    public async execute({ user_id, avatarFilename }: RequestDTO): Promise<Users> {
        const userRepository = getRepository(Users);

        const user = await userRepository.findOne(user_id);

        if(!user) {
            throw new Error('Only authenticated users can change avatar.');
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

        await userRepository.save(user);

        return user;
    }
}