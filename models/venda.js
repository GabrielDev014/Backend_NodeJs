const mongoose = require('./database')

const {Schema} = mongoose

const Vendas = new Schema(
    {
        data: {
            type: Date,
            default: Date.now
        },
        numeroNota: {
            type: Number,
            required: true,
            unique: true
        },
        cliente: {
            cpf: {
                type: String,
                required: true
            },
            nome: {
                type: String,
                required: true
            },
            endereco: {
                rua: {
                    type: String,
                    required: true
                },
                numero: {
                    type: Number,
                    required: true
                },
                bairro: {
                    type: String,
                    required: true
                },
                cidade: {
                    type: String,
                    required: true
                },
                estado: {
                    type: String,
                    required: true
                },
                cep: {
                    type: String,
                    required: true
                }
            },
            celular: {
                celular1: String,
                celular2: String
            },
            email: {
                type: String,
                required: true
            }
        },
        produtos: [
            {
                codigoInterno: {
                    type: Number,
                    required: true
                },
                nome: {
                    type: String,
                    required: true
                },
                categoria: String,
                quantidade: {
                    type: Number,
                    required: true
                },
                valorUnitario: {
                    type: Number,
                    required: true
                }
            }
        ],
        valorTotal: {
            type: Number,
            required: true
        }
    }
)

const Venda = mongoose.model("Vendas", Vendas)
module.exports = Venda