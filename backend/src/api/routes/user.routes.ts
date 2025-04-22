import express, { Router, RequestHandler } from "express"
import { getUsers,getUserById, updateUser, deleteUser } from "../controllers/user.controller"
import isAuth from "../middlewares/auth.middleware"

const router: Router = express.Router()

// Rutas protegidas que requieren autenticación
router.get("/", isAuth as RequestHandler, getUsers as RequestHandler)
router.get("/:id", isAuth as RequestHandler, getUserById as RequestHandler);  // 👈 esto es lo que falta
router.put("/:id", isAuth as RequestHandler, updateUser as RequestHandler)
router.delete("/:id", isAuth as RequestHandler, deleteUser as RequestHandler)

export default router