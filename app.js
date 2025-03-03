import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import productsRoutes from './routes/api/products.routes.js';
import cartsRoutes from './routes/api/carts.routes.js';
import usersRoutes from './routes/api/users.routes.js';
import ordersRoutes from './routes/api/orders.routes.js';
import viewsRoutes from './routes/views.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import pathHandler from './middlewares/pathHandler.js';

dotenv.config();

const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Rutas API
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);

// Rutas de vistas
app.use('/', viewsRoutes);

app.use('*', pathHandler);
app.use(errorHandler);

export default app;
