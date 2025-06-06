const mongoose = require('./database')

const {Schema} = mongoose

const UsuariosTable = new Schema(
    {
         usuario: {
            type:String,
            required:true,
            unique:true
        },
        senha: {
            required:true,
            type:String
        }
    }
)

const Usuarios = mongoose.model('Usuarios', UsuariosTable)
module.exports = Usuarios