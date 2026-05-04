import { Cliente } from "../models/Cliente.js";
import { Telefone } from "../models/Telefone.js";
import { Endereco } from "../models/Endereco.js";
import clienteRepository from "../repositories/clienteRepository.js";
import { limparNumero } from "../utils/limparNumero.js";
import axios from "axios";
import { validarCPF } from "../utils/validadorCpf.js";

const clienteController = {
    criar: async (req, res) => {
          try {
            let { nome, cpf, numero, cep, complemento, telefone} = req.body;
            
            cpf = limparNumero(cpf);
            cep = limparNumero(cep);
            telefone = limparNumero(telefone);

            console.log (telefone);
         
            if(!validarCPF (cpf))
                return res.status(409).json({message: "CPF invalido"})

            const respApiCep = await consultaCep(cep);

            const logradouro = respApiCep.logradouro;
            const bairro = respApiCep.bairro;
            const cidade = respApiCep.localidade;
            const uf = respApiCep.uf;

            const cliente = Cliente.criar({ nome, cpf});
            const telObj = Telefone.criar(telefone);
            const endereco = Endereco.criar({ cep, logradouro, numero, complemento, bairro, cidade, uf});



            const result = await clienteRepository.criar(cliente, telObj, endereco);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message})
        }
    },

     editar: async (req, res) => {
        try {
            const id = Number(req.query.id);
            const { nome, cpf } = req.body;
            const cliente = Cliente.editar({ nome, cpf},id);
            const result = await clienteRepository.editar(cliente);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message})
        }
    },

    deletar: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const result = await clienteRepository.deletar(id);
            res.status(201).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message})
        }
    },

     selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message})
        }
    }

}

export default clienteController;

async function consultaCep(cep) {
    try {
        const respApi = await axios.get(`http://viacep.com.br/ws/${cep}/json`);

        if(respApi.data.erro){
            throw new Error ('CEP não encontrado');
        }

        return respApi.data
    } catch (error) {
        console.error(error)
        throw new Error ("Erro ao buscar o CEP", error.message);
    }
}