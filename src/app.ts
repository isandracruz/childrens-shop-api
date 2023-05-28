import express from 'express';
import config from './config/config';
import cors from 'cors';
import indexRoutes from './routes/index.route';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import orderRoutes from './routes/order.route';
import authRoutes from './routes/auth.route';

const app = express();

app.set('port', config.PORT);

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

export default app;