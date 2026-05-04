import { Router } from "express";
const routes = Router();
import categoriasRoutes from "./categoriaRoutes.js";
import produtosRoutes from "./produtoRoutes.js";
import clientesRoutes from "./clienteRoutes.js"
import pedidoRoutes from "./pedidoRoutes.js";

routes.use('/categorias', categoriasRoutes);
routes.use('/produtos', produtosRoutes);
routes.use('/clientes', clientesRoutes);
routes.use('/pedidos', pedidoRoutes)

export default routes;