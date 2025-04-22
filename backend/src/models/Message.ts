import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../interfaces/message.interface';

// Definición del esquema de mensaje
const MessageSchema = new Schema<IMessage>({
  role: { type: String, required: true, enum: ['user', 'assistant', 'tool', 'system'] },
  content: { type: String, default: '' },
  tool_call_id: { type: String, required: function() { return this.role === 'tool'; } },
  tool_calls: {
    type: [{
      id: { type: String, required: true },
      type: { type: String, required: true, default: 'function' },
      function: {
        name: { type: String, required: true },
        arguments: { type: String, required: true }
      }
    }],
    default: undefined
  },
  metadata: {
    summary: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);