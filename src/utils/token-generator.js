import jwt from 'jsonwebtoken'; 
import 'dotenv/config'; 

const secret_key = process.env.JWT_SECRET; 
// Función para generar un token JWT export 
export const generateToken = (userData) => { 

    if (!secret_key) {
        throw new Error('JWT_SECRET is not defined in .env');
    }
    const user = {id: userData.id, email: userData.email}; 
    const expiration = { expiresIn: '1h' }; 
    return jwt.sign(user, secret_key, expiration); 
}; 