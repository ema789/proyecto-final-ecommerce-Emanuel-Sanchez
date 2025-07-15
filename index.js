// Importación de módulos
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importación de rutas
import productRouters from './src/routers/product.router.js';
import authRouter from './src/routers/auth.routes.js';
import { authentication } from './src/middlewares/authentication.js';
//import { errorHandler } from './src/middlewares/errorHandler.js'

// Inicializa configuración de variables de entorno
dotenv.config();

// Crea la aplicación Express
const app = express();

// Middlewares globales
app.use(cors());// Habilita CORS
app.use(express.json());// Parseo automático de JSON en body

// Ruta raíz para verificar si la API está funcionando
app.get("/",(req, res) => {
    res.json({messsage: "API Rest in Node.JS"});
});

// Rutas específicas
app.use('/auth', authRouter); // Rutas de autenticación
app.use('/api', authentication, productRouters);// Rutas de productos

//app.use(errorHandler);

// Middleware para manejar rutas no encontradas

// Middleware para manejar errores generales (si querés usarlo en el futuro)
// app.use(errorHandler);

// Puerto de escucha
app.use((req, res, next)=>{
    res.status(404).send(`Resources not found`);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));



