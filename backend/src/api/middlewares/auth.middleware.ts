import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"
import User from '../../models/Users'

// Middleware para verificar la autenticación del usuario
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    console.log('Cookies recibidas:', req.cookies);
    console.log('Headers recibidos:', req.headers);

    // Intentar obtener el token de las cookies
    if (req.cookies?.token) {
        token = req.cookies.token;
        console.log('Token encontrado en cookies:', token);
    }
    // Si no está en las cookies, intentar obtenerlo del header Authorization
    else if (req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('Token encontrado en headers:', token);
    }

    if (!token) {
        console.log('No se encontró token');
        return res.status(401).json({
            success: false,
            message: "No se proporcionó token de autenticación"
        });
    }

    try {
        console.log('Intentando verificar token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { email: string };
        console.log('Token decodificado:', decoded);

        const user = await User.findOne({ email: decoded.email });
        console.log('Usuario encontrado:', user);

        if (!user) {
            console.log('Usuario no encontrado en la base de datos');
            return res.status(401).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        // Agregar el usuario a la request
        req.user = user;
        next(); // Llamar a next() para pasar al siguiente middleware o controlador
    } catch (err: any) {
        console.error('Error de autenticación:', err.message);
        return res.status(401).json({
            success: false,
            message: "Token inválido o expirado"
        });
    }
};

export default isAuth;