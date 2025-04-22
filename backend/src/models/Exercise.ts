import mongoose from 'mongoose';

// Definición del esquema de ejercicio
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        alias: 'title'
    },
    type: {
        type: String,
        default: 'strength'
    },
    muscleGroup: {
        type: String,
        required: true,
        alias: 'bodyPart'
    },
    equipment: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        alias: 'level'
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: String,
        default: 'upstash'
    }
}, {
    timestamps: true
});

// Índice compuesto para búsquedas eficientes y evitar duplicados
exerciseSchema.index({ name: 1, description: 1 }, { unique: true });

export const Exercise = mongoose.model('Exercise', exerciseSchema); 