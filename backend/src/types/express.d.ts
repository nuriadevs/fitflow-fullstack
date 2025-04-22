import { User } from '../models/Users';

declare module 'express' {
    interface Request {
        user?: User;
    }
} 