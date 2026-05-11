import {Router} from "express";
import clienteController from "../controllers/clienteController.js";
const clientesRoutes = Router();

clientesRoutes.post('/', clienteController.criar);
clientesRoutes.put('/:id', clienteController.editar);
clientesRoutes.delete('/:id', clienteController.deletar);
clientesRoutes.get('/', clienteController.selecionar);

export default clientesRoutes;