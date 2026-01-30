import mongoose from 'mongoose';

// Definición del esquema de ejercicio del usuario
const userExerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    },
    favorite: {
        type: Boolean,
        default: false
    },
    lastPerformed: {
        type: Date
    },
    personalizedWeight: {
        type: Number
    },
    personalizedReps: {
        type: Number
    },
    personalizedSets: {
        type: Number
    }
}, {
    timestamps: true
});

// Índice compuesto para búsquedas eficientes
userExerciseSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });

export const UserExercise = mongoose.model('UserExercise', userExerciseSchema); 