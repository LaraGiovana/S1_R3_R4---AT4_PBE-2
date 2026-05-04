import {Router} from "express";
import pedidoController from "../controllers/pedidoController.js";
const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.put('/', pedidoController.editar);
pedidoRoutes.delete('/:id', pedidoController.deletar);
pedidoRoutes.get('/', pedidoController.selecionar);

export default pedidoRoutes;