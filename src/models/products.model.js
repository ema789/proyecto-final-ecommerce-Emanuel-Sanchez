
import { db } from '../data/data.js';
// Funciones de Firestore que vamos a usar
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    setDoc,
    doc,
} from 'firebase/firestore';

// Creamos una referencia a la colección 'products' en Firestore
const productsCollection = collection(db, 'products');
export async function fetchAllProducts() {

    try {
        //obtenemos todos los documentos de la coleccion.
        const querySnapshot = await getDocs(productsCollection);
        const products = [];
        //Accedemos a cada documento.
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        //retornamos los productos
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function getAllproductsById(id) {
    try {
        //obtenemos el documento solicitado por medio del ID.
        const productDoc = await getDoc(doc(productsCollection, id));

        //retorna el documento si existe, sino retorna vacio
        if (productDoc.exists()) {
            return productDoc.data()
        } else {
            return null;
        }
    } catch (error) {

        console.error('Error al obtener producto por ID:', error);
        throw error;
    }
};
export async function createProduct(data) {

    try {
        // Crea un nuevo documento en Firestore en la colección 'products'
        const docRef = await addDoc(productsCollection, data);

        // Construye el objeto producto con el ID generado por Firestore
        const newData = {
            id: docRef.id,
            ...data
        };

        return newData;
    } catch (error) {
        // Manejo básico de errores para saber si falló la creación
        console.error("Error creando producto:", error);
        throw error;
    }
};
export async function updateProduct(id, data) {

    try {

        //obtenemos el documento solicitado por medio del ID.
        const prodcutRef = doc(productsCollection, id);
        //retorna un documento en firestone.
        const snapshot = await getDoc(prodcutRef);
        //chequeamos si el documento existe. 
        if (!snapshot.exists) {
            return false;
        }
        //actualizamos el documentos.
        await setDoc(prodcutRef, data);
        //actualizamos el JSON.
        //Actualizar(id, data);

        return { id, ...data };

    } catch (error) {

        console.error(error)

    }

};

export async function deleteProductId(id) {

    try {
        //obtenemos el documento solicitado por medio del ID.
        const prodcutRef = doc(productsCollection, id);
        //retorna un documento en firestone.
        const snapshot = await getDoc(prodcutRef);
        //chequeamos si el documento existe. 
        if (!snapshot.exists) {
            return false;
        }

        //Elimina los datos del documento en firestone.
        await deleteDoc(prodcutRef);


        return true;

    } catch (error) {

        console.error(error)

    }
}
