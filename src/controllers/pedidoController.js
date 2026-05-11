import pedidoRepository from "../repositories/pedidoRepository.js";

const pedidoController = {
    criar: async (req, res) => {
        try {
            const { clienteId, itens } = req.body;

            if (!clienteId || !itens || itens.length === 0)
                return res.status(400).json({ message: "clienteId e itens são obrigatórios" });

            const subTotal = itens.reduce((acc, item) => acc + item.valorItem * item.quantidade, 0);

            const pedido = {
                clienteId,
                subTotal,
                status: 'Pendente'
            };

            const result = await pedidoRepository.criar(pedido, itens);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { clienteId, itens, status } = req.body;

            if (!id || !clienteId || !itens || itens.length === 0)
                return res.status(400).json({ message: "id, clienteId e itens são obrigatórios" });

            const subTotal = itens.reduce((acc, item) => acc + item.valorItem * item.quantidade, 0);

            const pedido = { id, clienteId, subTotal, status, itens };
            const result = await pedidoRepository.editar(pedido);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);

            if (error.message === 'Pedido não encontrado')
                return res.status(404).json({ message: error.message });

            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    deletar: async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await pedidoRepository.deletar(id);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);

        if (error.message === 'Pedido não encontrado')
            return res.status(404).json({ message: error.message });

        res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
},

    selecionar: async (req, res) => {
        try {
            const result = await pedidoRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default pedidoController;