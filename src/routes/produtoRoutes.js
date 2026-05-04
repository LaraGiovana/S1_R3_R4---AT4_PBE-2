import {Router} from "express";
import produtoController from "../controllers/produtoController.js"
import uploadImage from "../middlewares/uploadImage.middlewares.js";
const produtosRoutes = Router();

produtosRoutes.post('/', uploadImage, produtoController.criar)
produtosRoutes.put('/', uploadImage, produtoController.atualizar)
produtosRoutes.delete('/:id', produtoController.deletar)
produtosRoutes.get('/', produtoController.selecionar)

export default produtosRoutes;