import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { IUser } from '../interfaces/user.interface';

const Schema = mongoose.Schema

// Definición del esquema de usuario
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// Método para encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model<IUser>("User", userSchema)
export default User