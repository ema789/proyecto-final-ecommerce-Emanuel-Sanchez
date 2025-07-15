export function errorHandler(err, req, res, next){
    
    console.log(err.stack);
    res.status(500).json({ error: err.message || "Error interno del servidor"});
}