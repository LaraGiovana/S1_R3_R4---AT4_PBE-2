export class Telefone{
    #id;
    #clienteId;
    #numero;
    #dataCad;

    constructor(pNumero, pId, pClienteId){
        this.id = pId;
        this.clienteId = pClienteId;
        this.numero = pNumero;
    }

    get id(){
        return this.#id;
    }

    set id(value){
        this.#validarId(value);
        this.#id = value;
    }


    get clienteId(){
        return this.#clienteId;
    }

    set clienteId(value){
        this.#validarClienteId(value);
        this.#clienteId = value;
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
    #validarClienteId(value){
        if(value && value <= 0){
            throw new Error('ID inválido');
        }
    }
    #validarNumero(value){        
        if(!value && value.trim().length < 10 ){
            throw new Error('Verifique o telefone enviado');
        }
    }

 
     static criar(telefone){

        return new Telefone( telefone, null, null);}

    static editar(telefone,id){
        return new Telefone( telefone, id, idCliente);}
}
