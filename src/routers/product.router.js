// Importa el Router de Express para crear rutas separadas
import { Router } from 'express';
import { authentication } from '../middlewares/authentication.js';

// Importa los controladores que manejarán cada ruta
const router = Router();

import { 
        getAllProducts,// GET /products → Obtener todos los productos
        createProduct, // POST /products → Crear un nuevo producto
        getAllProductsById, // GET /products/:id → Obtener un producto por su id
        updateProduct, // PUT /products/:id → Actualizar un producto
        deleteProductId // DELETE /products/:id → Eliminar un producto
} from '../controllers/product.controller.js'

// Definición de rutas:

// Ruta para obtener todos los productos
router.get("/products",  authentication, getAllProducts); 

// Ruta para crear un nuevo producto
router.get("/products/:id", authentication, getAllProductsById);

// Ruta para crear un nuevo producto
router.post("/products", authentication, createProduct);

// Ruta para actualizar un producto existente
router.put("/products/:id", authentication, updateProduct);

// Ruta para eliminar un producto
router.delete("/products/:id", authentication, deleteProductId);

// Exporta el router configurado para usarlo en la app principal
export default router;