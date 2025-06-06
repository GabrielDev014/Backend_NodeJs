const mongoose = require('./database')

const {Schema} = mongoose

const Clientes = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true,
            unique: true
        },
        endereco: {
            cidade: String,
            estado: String,
            cep: String,
            bairro: String,
            rua: String,
            numero: String
        },
        celular: {
            celular1: String,
            celular2: String
        },
        email: String
    }
)

const Cliente = mongoose.model("Clientes", Clientes)
module.exports = Cliente