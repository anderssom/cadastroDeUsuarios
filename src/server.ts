import "reflect-metadata";
import express from 'express';
import routes from './routes';

import upload from './config/upload';
import './database';

const app = express();

//app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);

app.listen(4444, () => {
    console.log(' Hello my Fryends porta 4444 :grinning')
})