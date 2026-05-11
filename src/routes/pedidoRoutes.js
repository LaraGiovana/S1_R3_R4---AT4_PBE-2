import {Router} from "express";
import pedidoController from "../controllers/pedidoController.js";
const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.put('/:id', pedidoController.editar);
pedidoRoutes.delete('/:id', pedidoController.deletar);
pedidoRoutes.get('/', pedidoController.selecionar);

export default pedidoRoutes;