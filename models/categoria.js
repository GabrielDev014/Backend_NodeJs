const mongoose = require('./database')

const {Schema} = mongoose

const Categorias = new Schema(
    {
        categoria: {
            type: String,
            required: true,
            unique: true,
        },
        descricao: String
    }
)

const Categoria = mongoose.model("Categorias", Categorias)
module.exports = Categoria