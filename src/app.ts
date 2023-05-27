import express from 'express';
import config from './config/config';
import indexRoutes from './routes/index.route';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';

const app = express();

app.set('port', config.PORT);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(productRoutes);

export default app;