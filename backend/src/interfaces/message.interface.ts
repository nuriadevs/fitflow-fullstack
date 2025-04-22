import { Document } from 'mongoose';
import type { AIMessage } from '../types/types';

export interface IMessage extends Document, AIMessage {
    _id: string;
    createdAt: Date;
} 