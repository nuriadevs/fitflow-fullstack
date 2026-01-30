// backend/src/config/cookieOptions.ts
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', 
  sameSite: 'lax' as 'strict' | 'lax' | 'none',  
  path: '/',
  maxAge: 3600000 // 1 hora en milisegundos
};

export default cookieOptions;