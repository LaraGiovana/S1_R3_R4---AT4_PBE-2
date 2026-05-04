import { connection } from "../configs/Database.js";

const clienteRepository = {
      criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();
        try {
           conn.beginTransaction();
           
        const sqlCli = 'INSERT INTO clientes (nome, cpf) VALUES (?,?)';
        const valuesCli = [cliente.nome, cliente.cpf];
        const[rowsCli] = await conn.execute(sqlCli, valuesCli);

        const sqlTel = 'INSERT INTO telefones (clienteId, numero) VALUES (?,?)';
        const valuesTel = [rowsCli.insertId, telefone.numero];
        const[rowsTel] = await conn.execute(sqlTel, valuesTel);

        const sqlEnd = 'INSERT INTO enderecos (clienteId, cep, bairro, cidade, uf, logradouro, complemento ,numero) VALUES (?,?,?,?,?,?,?,?)';
        const valuesEnd = [rowsCli.insertId, endereco.cep, endereco.bairro, endereco.cidade, endereco.uf, endereco.logradouro, endereco.complemento, endereco.numero];
        const[rowsEnd] = await conn.execute(sqlEnd, valuesEnd);

           conn.commit();
           return { rowsCli, rowsTel, rowsEnd };
        } catch (error) {
            conn.rollback();
            throw new Error(error);
        }
        finally{
            conn.release();
        }
    },

     editar: async (cliente, telefone, endereco) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const sqlCli = 'UPDATE clientes SET nome=?, cpf=? WHERE id=?';
        const valuesCli = [cliente.nome, cliente.cpf, cliente.id];
        await conn.execute(sqlCli, valuesCli);

        const sqlTel = 'UPDATE telefones SET numero=? WHERE clienteId=?';
        const valuesTel = [telefone.numero, cliente.id];
        await conn.execute(sqlTel, valuesTel);

        const sqlEnd = ` UPDATE enderecos  SET cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, uf=?  WHERE clienteId=?`;
        const valuesEnd = [ endereco.cep, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, cliente.id ];
        await conn.execute(sqlEnd, valuesEnd);

        await conn.commit();

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
},
                    

 selecionar: async () => {
        const sql = 'SELECT * FROM clientes AS c INNER JOIN Telefones AS t ON c.id = t.id INNER JOIN enderecos AS e ON c.id = e.id';
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
    const sql = 'DELETE FROM clientes WHERE id = ?;';
    const values = [id];
    const [rows] = await connection.execute(sql, [id]);
    return rows;
}
}



export default clienteRepository;


