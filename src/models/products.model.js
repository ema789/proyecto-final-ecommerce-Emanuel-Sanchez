// Módulo para trabajar con el sistema de archivos (leer/escribir JSON local)
import fs from 'fs';
// Módulo para manejar rutas del sistema de archivos
import path from 'path';
// Necesario para convertir rutas de módulos ES en rutas absolutas
import { fileURLToPath } from 'url';
// Importamos la instancia de Firestore desde nuestra configuración Firebase
import { db } from '../data/data.js';

// Funciones de Firestore que vamos a usar
import { collection,
         getDocs, 
         getDoc,
         addDoc, 
         deleteDoc,
         updateDoc,
         doc,
         runTransaction
} from 'firebase/firestore'; 

// Creamos una referencia a la colección 'products' en Firestore
const productsCollection = collection(db,  'products'); 


// Convertimos la ruta del archivo actual a un path absoluto
const __filename = fileURLToPath(import.meta.url);
// Obtenemos el directorio del archivo actual
const __dirname = path.dirname(__filename);

// Construimos la ruta absoluta hacia el archivo local de productos en formato JSON
const dataPath = path.join(__dirname, '../data/products.json');

// Leemos el contenido del archivo JSON y lo parseamos para trabajar como array de objetos
const json = fs.readFileSync(dataPath, 'utf-8');
const productsJSON = JSON.parse(json);

export async function fetchAllProducts(){

    //obtenemos todos los documentos de la coleccion.
    const querySnapshot = await getDocs(productsCollection);
    const products = []; 
    //Accedemos a cada documento.
    querySnapshot.forEach((doc) => {         
        products.push({ id: doc.id, ...doc.data() });     
    });

    //escribe o sobreescribe el archivo local convertido a texto JSON.
    fs.writeFileSync(dataPath, JSON.stringify(products));
    //retornamos los productos
    return  products;
}

export async function getAllproductsById(id) {

    //obtenemos el documento solicitado por medio del ID.
    const productDoc = await getDoc(doc(productsCollection,id));

    //retorna el documento si existe, sino retorna vacio
    if(productDoc.exists()){
        return productDoc.data()
    }else{
        return null;
    }
}


export async function createProduct(data) {

    //crea un nuevo documento en la coleccion.
    const docRef = await addDoc(productsCollection,data);

    //creamos un objeto se mantiene el id del dato de la BS
    const newData = {
        id: docRef.id,
        ...data
    }
    //agregamos en el arreglo.
    productsJSON.push(newData);
     //escribe o sobreescribe el archivo local convertido a texto JSON.
    fs.writeFileSync(dataPath, JSON.stringify(productsJSON, null, 2));
    
    return newData;
    
}


function Actualizar(id,data){
    
    //buscamos el id, dentro del JSON.
    const index = productsJSON.findIndex((p) => p.id === id);
    //si es diferente de -1, actualiza en esa pósicion los datos solicitados.
    if(index !== -1){
        productsJSON[index] = {
            ...productsJSON[index],
            ...data
        };
    };
    //escribe o sobreescribe el archivo local convertido a texto JSON.
    fs.writeFileSync(dataPath, JSON.stringify(productsJSON, null, 2));

};
export async function updateProduct(id, data) {

    try{

       //obtenemos el documento solicitado por medio del ID.
        const prodcutRef = doc(productsCollection, id);
        //retorna un documento en firestone.
        const snapshot = await getDoc(prodcutRef);
        //chequeamos si el documento existe. 
        if(!snapshot.exists){
            return false; 
        }
        //actualizamos el documentos.
        await updateDoc(prodcutRef, data);
        //actualizamos el JSON.
        Actualizar(id,data);
     
        return true;

    }catch (error){

        console.error(error)

    }

};

export async function deleteProductId(id) {

    try{
        //obtenemos el documento solicitado por medio del ID.
        const prodcutRef = doc(productsCollection, id);
        //retorna un documento en firestone.
        const snapshot = await getDoc(prodcutRef);
        //chequeamos si el documento existe. 
        if(!snapshot.exists){
            return false; 
        }

        //Elimina los datos del documento en firestone.
        await deleteDoc(prodcutRef);
       

       return true;

    }catch (error){

        console.error(error)

    }
}
