import "reflect-metadata";
import express from 'express';

import './database';

const app = express();

app.listen(4444, () => {
    console.log(' Hello my Fryends porta 4444 :grinning')
})