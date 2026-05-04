import {Router} from "express";
import categoriaController from "../controllers/categoriaController.js";
const categoriasRoutes = Router();

categoriasRoutes.post('/', categoriaController.criar);
categoriasRoutes.put('/', categoriaController.atualizar);
categoriasRoutes.delete('/:id', categoriaController.deletar);
categoriasRoutes.get('/', categoriaController.selecionar);

export default categoriasRoutes;