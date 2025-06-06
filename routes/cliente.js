const express = require("express")
const route = express.Router()

const Cliente = require("../models/cliente")

route.get("/cliente{/:nome}", async function(req, res){
    try
    {
        var nome = req.params.nome
        var id = req.query.id
        
        var busca
        if (nome) {
            busca = await Cliente.find({nome: {$regex: nome, $options: "i"}})
        }
        else if (id) {
            busca = await Cliente.find({_id: id})
        }
        else {
            busca = await Cliente.find()
        }

        return res.send(busca)
    }
    catch(e){
        console.log(e)
    }
})

route.post("/cliente", async function(req, res){
    try
    {
        var {nome, cpf, endereco, celular, email} = req.body
    
        if (nome == undefined || nome == "")
            return res.send({error:"O nome não pode ser nulo."})

        if (cpf == undefined || cpf == "")
            return res.send({error:"O cpf não pode ser nulo."})

        var cliente_inserido = await Cliente.create({nome, cpf, endereco, celular, email})
        
        if (cliente_inserido)
            return res.send({message:"Cliente inserido com sucesso!", cliente_inserido})
    }
    catch (e) {
        console.log(e)
    } 
})

route.put("/cliente", async (req, res) => {
    try 
    {
        var {id, nome, cpf, endereco, celular, email} = req.body

        if(id == undefined || id == "")
            return res.send({error:"O id não pode ser nulo"})

        if (nome == undefined || nome == "")
            return res.send({error: "O nome não pode ser nulo."})

        if (cpf == undefined || cpf == "")
            return res.send({error:"O cpf não pode ser nulo."})

        await Cliente.findByIdAndUpdate(id, {nome, cpf, endereco, celular, email})
        var cliente_alterado = await Cliente.findOne({_id: id})

        return res.send({message: "Alteração realizada com sucesso!", cliente_alterado})
    }
    catch (e) {
        console.log(e)
    }

})

route.delete("/cliente", async (req, res)=>{
    try
    {
        var { id } = req.body
        if (id == undefined || id == "")
            return res.send({error: "Id do cliente não encontrado."})

        await Cliente.deleteOne({_id:id})

        return res.send({message: "Cliente removido com sucesso!"})
    }
    catch(e){
        console.log(e)
    }
})

module.exports = app => app.use("/api", route)