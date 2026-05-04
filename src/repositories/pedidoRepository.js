import { connection } from '../configs/Database.js'

const pedidoRepository = {
   criar: async (pedido, itemPed) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const sqlPedido = 'INSERT INTO pedidos (ClienteId, SubTotal, Status) VALUES (?, ?, ?)';
        const valuesPedido = [pedido.clienteId, pedido.subTotal, pedido.status];
        const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

        for (const element of itemPed) {
            const sqlItemPed = 'INSERT INTO itenspedidos (PedidoId, produtoId, quantidade, valorItem) VALUES (?, ?, ?, ?)';
            const valuesItemPed = [rowsPedido.insertId, element.produtoId, element.quantidade, element.valorItem];
            await conn.execute(sqlItemPed, valuesItemPed);
        }

        await conn.commit();
        return { rowsPedido, itemPed };

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
},

    editar: async (pedidos) => {

                const sqlCli = 'UPDATE pedidos SET (ClienteId, SubTotal, Status)VALUES (?, ?, ?)';
                const valuesCli = [pedidos.clienteId, pedidos.subTotal, pedidos.status];
                const [rowsCli] = await conn.execute(sqlCli, valuesCli);
                

                const sqlTel = 'UPDATE itens_pedidos SET quantidade=?, valorItem=? WHERE id_pedido=?';
                const valuesTel = [rowsPedido, rowsCli.insertId];
                const [rowsTel] = await conn.execute(sqlTel, valuesTel);
            
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM pedidos AS p JOIN itens_pedidos AS ip ON p.id = ip.PedidoId';
        const [rowsPedido] = await connection.execute(sql);
        return rowsPedido;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM pedidos WHERE id=?';
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    }
};

export default pedidoRepository;