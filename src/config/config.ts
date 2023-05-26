import * as dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/childernss-shop',
};