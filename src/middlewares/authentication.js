import jwt, { decode } from 'jsonwebtoken';
import 'dotenv/config'; 

const secret_key = process.env.JWT_SECRET; 
// Middleware para verificar el token JWT 
export const authentication = (req, res, next) => { 
    
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const parts = authHeader.split(' ');
    
    // Validar que el formato sea correcto
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid authorization format' });
    } 
    
    const token = parts[1];

    if (!token) return res.status(401).json({ error: 'Token missing'}); 
    
    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) return res.status(403).json({error: 'invalid or experid token'}); 
        
        req.user = decoded;
        next();
    }); 
};