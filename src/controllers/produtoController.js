import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produto.Repository.js";

const produtoController = {

    criar: async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({ message: 'Arquivo não enviado' });
            }

            const { idCategoria, nome, valor } = req.body;

            const caminhoImagem = `/uploads/images/${req.file.filename}`;

            const produto = Produto.criar(
                { idCategoria, nome, valor },
                caminhoImagem
            );

            const result = await produtoRepository.criar(produto);

            res.status(201).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }
    },

    atualizar: async (req, res) => {

        try {

            const id = Number(req.query.id);

            const { idCategoria, nome, valor } = req.body;

            const caminhoImagem = req.file
                ? `/uploads/images/${req.file.filename}`
                : null;

            const produto = Produto.editar(
                { idCategoria, nome, valor },
                caminhoImagem,
                id
            );

            const result = await produtoRepository.editar(produto);

            res.status(201).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }

    },

    deletar: async (req, res) => {

        try {

            const id = Number(req.params.id);

            const result = await produtoRepository.deletar(id);

            res.status(201).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }

    },

    selecionar: async (req, res) => {

        try {

            const result = await produtoRepository.selecionar();

            res.status(200).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });

        }

    }

};

export default produtoController;