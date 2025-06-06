const mongoose = require('./database')

const {Schema} = mongoose

const Produtos = new Schema (
    {
        codigoInterno: {
            type: Number,
            required: true,
            unique: true
        },
        nome: {
            type: String,
            required: true
        },
        valor: {
            type: Number,
            required: true
        },
        categoria: String,
        quantidade: {
            type: Number,
            required: true
        },
        descricao: String
    }
)


const Produto = mongoose.model("Produtos", Produtos)
module.exports = Produto