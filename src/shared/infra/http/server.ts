import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';
import upload from '@config/upload';
import '@shared/infra/database';
import AppError from '@shared/errors/AppError';

const app = express();

//app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);

app.use(
    ( err: Error, request: Request, response: Response, next: NextFunction ) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }
    
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error', 
        });
    }
);

app.listen(4444, () => {
    console.log(' Hello my Fryends porta 4444 :grinning')
})