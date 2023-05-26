import express from 'express';
import config from './config/config';

const app = express();

app.set('port', config.PORT);

export default app;