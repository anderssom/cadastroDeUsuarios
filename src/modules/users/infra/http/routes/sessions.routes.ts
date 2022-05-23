import { Router }  from 'express'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

    const { email, password } = request.body;

    const authencateUser = new AuthenticateUserService();

    const { user, token } = await authencateUser.execute({
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

    return response.json({ userWithoutPassword, token });
    
    return response.status(error.statusCode).json({ err: error.message });
    
});

export default sessionsRouter;