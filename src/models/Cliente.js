import { validarCPF } from "../utils/validadorCpf.js";

export class Cliente {

    #id;
    #nome;
    #cpf;
    #dataCad;

    constructor(pNome, pCpf, pId){

        this.nome = pNome;
        this.cpf = pCpf;
        this.id = pId;

    }

    get id(){
        return this.#id;
    }

    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(value){
        validarCPF(value);
        this.#cpf = value;
    }


    #validarId(value){
        if(value && value <= 0){
            throw new Error('ID inválido');
        }
    }

    #validarNome(value){
        if(!value || value.trim().length < 3){
            throw new Error('Nome inválido');
        }
    }



    static criar(dados){
        return new Cliente( dados.nome, dados.cpf, null);}

    static editar(dados,id){
        return new Cliente( dados.nome, dados.cpf, id);}
}