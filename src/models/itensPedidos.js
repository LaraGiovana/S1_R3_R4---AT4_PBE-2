export class ItensPedido {
    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    // Construtor
    constructor( pProdutoId, pQuantidade, pValorItem, pPedidoId, pId,) {
        this.#produtoId = pProdutoId;
        this.quantidade = pQuantidade;
        this.valorItem = pValorItem;
        this.pedidoId = pPedidoId;
        this.id = pId;
    }

    // Geterrs
    get id() {
        return this.#id;
    }
    get pedidoId() {
        return this.#pedidoId;
    }
    get produtoId() {
        return this.#produtoId;
    }
    get quantidade() {
        return this.#quantidade;
    }
    get valorItem() {
        return this.#valorItem;
    }

    // Setters
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }
    set pedidoId(value) {
        this.#validarpedidoId(value);
        this.#pedidoId = value;
    }
    set produtoId(value) {
        this.#validarprodutoId(value);
        this.#produtoId = value;
    }
    set quantidade(value) {
        this.#validarquantidade(value);
        this.#quantidade = value;
    }
    set valorItem(value) {
        this.#validarvalorItem(value);
        this.#valorItem = value;
    }

    // Métodos auxiliares
    #validarId(value) {
        if (value && value <= 0) {
            throw new error("Verifique o ID informado");
        }
    }

    #validarpedidoId(value) {
        if (!value && value <= 0) {
            throw new error("Verifique o ID do pedido informado");
        }
    }

    #validarprodutoId(value) {
        if (!value && value <= 0) {
            throw new error("Verifique o ID do produto informado");
        }
    }

    #validarquantidade(value) {
        if (!value || value <= 0) {
            throw new error("Não foi possível obter a quantidade");
        }
    }

    #validarvalorItem(value) {
        if (!value || value <= 0) {
            throw new error("Informe um valor para o item");
        }
    }

    static calcularSubTotal(itens){
        return (itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade), 0
        ))
    }

    // Design Pattern
    static criar(dados) {
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, dados.pedidoId, null);
    }

    static editar(dados, id) {
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, dados.pedidoId, id);
    }
}