import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

export default class SessionsController {

    public async create(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body;

    const authencateUser = container.resolve(AuthenticateUserService);

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


    }
}