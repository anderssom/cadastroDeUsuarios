import { Router }  from 'express'
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    
    const {name, email, password} = request.body;

    const createUser = new CreateUsersService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    //deletar password da listagen
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
        
    return response.json(userWithoutPassword);
   
    return response.status(400).json({ error: error.message });
    
});

usersRouter.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    async (request, response) => {
        
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.body.filename,
        });

        return response.json({user});
        
        return response.status(400).json({ error: err.message });
        
    } 
);

export default usersRouter;