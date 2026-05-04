export class Endereco{
    #id;
    #clienteId;
    #cep;
    #bairro;
    #cidade;
    #uf;
    #logradouro;
    #complemento;
    #numero;

    constructor( pCep, pBairro, pCidade, pUf, pLogradouro, pComplemento ,pNumero, pId, pClienteId){
        this.id = pId;
        this.clienteId = pClienteId;
        this.cep = pCep;
        this.bairro = pBairro;
        this.cidade = pCidade;
        this.uf = pUf;
        this.logradouro = pLogradouro;
        this.complemento = pComplemento;
        this.numero = pNumero;
    }

    get id(){
        return this.#id;
    }
    set id(value){
        this.#id = value;
    }


    get clienteId(){
        return this.#clienteId;
    }
    set clienteId(value){
        this.#clienteId = value;
    }

    get cep(){
        return this.#cep;

    }
    set cep (value){
        this.#cep = value;

    }

    get bairro(){
        return this.#bairro;
    }
    set bairro (value){
        this.#bairro = value;
    }

    get cidade (){
        return this.#cidade;
    }
    set cidade (value){
        this.#cidade = value;
    }

    get uf(){
        return this.#uf;

    }
    set uf (value){
        this.#uf = value;
    }

    get logradouro(){
        return this.#logradouro;

    }
    set logradouro(value){
        this.#logradouro = value;
    }

    get complemento(){
        return this.#complemento;
    }
    set complemento (value){
        this.#complemento = value;
    }

    get numero(){
        return this.#numero;
    }
    set numero(value){
        this.#validarNumero(value);
        this.#numero = value;
    }


    #validarId(value){
        if(value && value <= 0){
            throw new Error('ID inválido');
        }
    }

    #validarNumero(value){
        if(!value){
            throw new Error('Numero inválido');
        }
    }

     static criar(dados){
        return new Endereco( dados.cep, dados.bairro, dados.cidade, dados.uf, dados.logradouro, dados.complemento ,dados.numero, null, null);}

    static editar(dados,id){
        return new Endereco( dados.clienteId, dados.cep, dados.bairro, dados.cidade, dados.uf, dados.logradouro, dados.complemento ,dados.numero, id);}
}
