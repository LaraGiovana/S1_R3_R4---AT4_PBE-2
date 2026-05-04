export class Produto {

    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImagem, pDataCad, pId){
        this.idCategoria = pIdCategoria;
        this.nome = pNome;
        this.valor = pValor;
        this.caminhoImagem = pCaminhoImagem;
        this.dataCad = pDataCad;
        this.id = pId;

    }

    get id(){
        return this.#id;
    }

    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get idCategoria(){
        return this.#idCategoria;
    }

    set idCategoria(value){
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor(){
        return this.#valor;
    }

    set valor(value){
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImagem(){
        return this.#caminhoImagem;
    }

    set caminhoImagem(value){
        this.#validarPathImagem(value);
        this.#caminhoImagem = value;
    }

    get dataCad(){
        return this.#dataCad;
    }

    set dataCad(value){
        this.#dataCad = value;
    }

    #validarId(value){
        if(value && value <= 0){
            throw new Error('O valor do ID não corresponde ao esperado')
        }
    }

    #validarIdCategoria(value){
        if(!value || value <= 0){
            throw new Error('O campo idCategoria é obrigatório')
        }
    }

    #validarNome(value){
        if(!value || value.trim().length < 3 || value.trim().length > 60){
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 60 caracteres')
        }
    }

    #validarValor(value){
        if(!value || value <= 0){
            throw new Error('O valor do produto deve ser maior que zero')
        }
    }

    #validarPathImagem(value){
        if(!value || value.trim().length === 0){
            throw new Error('O caminho da imagem é obrigatório')
        }
    }


    static criar(dados, caminhoImagem){

        return new Produto( dados.idCategoria, dados.nome, dados.valor, caminhoImagem, new Date(), null)
    }

    static editar(dados, caminhoImagem, id){

        return new Produto(dados.idCategoria, dados.nome, dados.valor, caminhoImagem, new Date(),id)
    }
}