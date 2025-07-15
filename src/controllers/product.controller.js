import { parse } from 'dotenv';
import *as model from '../models/products.model.js';

// Exportamos la función como controlador asincrónico.
export const getAllProducts = async (req, res, next) => {
    try {

        // Llamamos al modelo que se encarga de traer todos los productos desde Firestore (y/o el JSON).
        const products = await model.fetchAllProducts();
        // Respondemos con un JSON de los productos obtenidos
        res.status(200).json(products);

    } catch (error) {

        // Si ocurre un error, lo mostramos por consola (útil para debug)
        console.error('Error getting products:', error);
        // Respondemos con un error 500 (interno del servidor)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controlador que obtiene un producto por su ID
export const getAllProductsById = async (req, res, next) => {
    try {
        // Extrae el parámetro "id" de la URL (por ejemplo: /api/products/:id)
        const { id } = req.params;
        // Llama a la función del modelo para obtener el producto desde Firestore
        const product = await model.getAllproductsById(id);

        // Si no se encuentra el producto, responde con un estado 404 (No encontrado)
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        };

        // Si se encuentra, responde con estado 200 (OK) y el producto en formato JSON
        res.status(200).json(product);
    } catch (error) {
        // Si ocurre un error inesperado, responde con 500 (Error del servidor)
        console.error(' Error getting product by ID: ', error);
        return res.status(500).json({ error: "Internal server error" });
    }

};

export const createProduct = async (req, res) => {
    try {
        // Extrae los campos del cuerpo de la solicitud (body)
        const { name, price, stock, stockActual } = req.body;
        if (!name || price == null || stock == null || stockActual == null) {
            return res.status(400).json({ error: ' All fields are required' });
        }
        // Llama a la función del modelo para crear el producto en Firestore y JSON
        const newProduct = await model.createProduct({ name, price, stock, stockActual });
        // Responde con estado 201 (Created) y el producto creado en formato JSON
        res.status(201).json({
            message: 'Producto creado correctamente',
            product: newProduct
        });
    } catch (error) {
        console.error('Error creating product: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateProduct = async (req, res) => {

    try {
        // Extrae el ID del producto desde los parámetros de la ruta (ej: /api/products/:id)
        const { id } = req.params;
        // Extrae los campos permitidos desde el cuerpo de la solicitud
        const { name, price } = req.body;

        // Crear el objeto de datos a actualizar
        const data = { name, price };

        // Llama a la función del modelo para intentar actualizar el producto
        const product = await model.updateProduct(id, data);

        // Si el producto no existe, responde con 404 (no encontrado)
        if (!product) {
            return res.status(404).json({ message: 'Produc not found' });
        }

        // 400 si no hay campos válidos para actualizar
        if (product === 'NO_VALID_FIELDS') {
            return res
                .status(400)
                .json({ message: 'No valid fields were sent for update' });
        }

        res.json({
            message: 'Successfully updated product',
            product,
        });
    } catch (error) {
        // Si ocurre un error inesperado, responde con 500 (error interno)
        console.error('Error updating the product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteProductId = async (req, res) => {
    try {
        
        // Extraer el id del producto desde los parámetros de la URL
        const prodId = req.params.id;

        // Llamar al modelo para intentar eliminar el producto con ese id
        // Se espera que devuelva 'true' si se eliminó o 'false' si no existe
        const product = await model.deleteProductId(prodId);

        // Si no se encontró el producto para eliminar, responder con 404
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Responder con código 204 No Content para indicar eliminación exitosa
        // sin contenido en el cuerpo de la respuesta
        res.status(204).send();
    } catch (error) {
        // Capturar cualquier error inesperado y responder con error 500
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};