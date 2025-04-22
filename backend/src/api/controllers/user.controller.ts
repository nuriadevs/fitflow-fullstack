import { Request, Response } from 'express';
import User from '../../models/Users';
import { userResponses } from '../../responses/user.response';


// Función para obtener todos los usuarios
const getUsers = async (req: Request, res: Response) => {
  try {

    const users = await User.find();
    res.status(200).json(users)
  } catch (err: any) {
    res.status(500).json(userResponses.internalError());
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Función para actualizar un usuario por su ID
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, username } = req.body;

  try {
    await User.findByIdAndUpdate(id, { email, username });
    res.status(200).json(userResponses.updateSuccess(username));
  } catch (err: any) {
    res.status(500).json(userResponses.internalError());
  }
};

// Función para eliminar un usuario por su ID
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json(userResponses.deleteSuccess());
  } catch (err: any) {
    res.status(500).json(userResponses.internalError());
  }
};

export { getUsers, updateUser, deleteUser };
