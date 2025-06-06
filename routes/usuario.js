const express = require("express")

var route = express.Router()

var UsuarioDb = require("../models/usuario")

route.post("/login", async (req, res) => {
    var {usuario, senha} = req.body

    if (usuario == undefined || usuario == "")
        return res.send({error: "Usuário não pode ser vazio."})

    if (senha == undefined || senha == "")
        return res.send({error: "Senha não pode ser nula."})

    var retorno = await UsuarioDb.findOne({usuario})

    if (retorno == null)
        return res.send({error: "Usuário e/ou senha inválidos."})

    if (retorno.senha != senha)
        return res.send({error: "Usuário e/ou senha inválidos."})

    return res.send("Seja bem vindo ao meu backend!")
})

route.post("/registrar", async (req, res)=> { 
    try
    {
        var {usuario, senha, confirma} = req.body

        if (usuario == undefined || usuario == "")
            return res.send({error: "Usuário não pode ser vazio."})

        if (senha == undefined || senha == "")
            return res.send({error: "Senha não pode ser nula."})

        if (confirma == undefined || confirma == "")
            return res.send({ erro: "A confirmação de senha não pode ser nula." })

        if (senha != confirma)
            return res.send({error: "Senha e confirma são diferentes."})

        var retorno = await UsuarioDb.insertOne({ usuario, senha })
        if (retorno)
            return res.send({message: "Usuário criado com sucesso!"})
    }
    catch (e) {
        console.log(e)
    } 
})

module.exports = app => app.use("/auth", route)