import { connection } from '../configs/Database.js';

const pedidoRepository = {
    criar: async (pedido, itemPed) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlPedido = 'INSERT INTO pedidos (ClienteId, SubTotal, Status) VALUES (?, ?, ?)';
            const valuesPedido = [pedido.clienteId, pedido.subTotal, pedido.status];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            for (const element of itemPed) {
                const sqlItemPed = 'INSERT INTO itens_pedidos (PedidoId, produtoId, quantidade, valorItem) VALUES (?, ?, ?, ?)';
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
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlPedido = 'UPDATE pedidos SET ClienteId=?, SubTotal=?, Status=? WHERE id=?';
            const valuesPedido = [pedidos.clienteId, pedidos.subTotal, pedidos.status, pedidos.id];
            const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

            if (rowsPedido.affectedRows === 0)
                throw new Error('Pedido não encontrado');

            for (const element of pedidos.itens) {
                const sqlItens = 'UPDATE itens_pedidos SET quantidade=?, valorItem=? WHERE PedidoId=? AND produtoId=?';
                const valuesItens = [element.quantidade, element.valorItem, pedidos.id, element.produtoId];
                await conn.execute(sqlItens, valuesItens);
            }

            await conn.commit();
            return rowsPedido;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM pedidos AS p JOIN itens_pedidos AS ip ON p.id = ip.PedidoId';
        const [rowsPedido] = await connection.execute(sql);
        return rowsPedido;
    },

   deletar: async (id) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const sqlItens = 'DELETE FROM itens_pedidos WHERE PedidoId=?';
        await conn.execute(sqlItens, [id]);
        const sqlPedido = 'DELETE FROM pedidos WHERE id=?';
        const [rows] = await conn.execute(sqlPedido, [id]);

        if (rows.affectedRows === 0)
            throw new Error('Pedido não encontrado');

        await conn.commit();
        return rows;

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}
};

export default pedidoRepository;