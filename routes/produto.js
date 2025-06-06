const express = require("express")
const route = express.Router()

const Produto = require("../models/produto")

route.get("/produto{/:nome}", async function(req, res){
    try
    {
        var nome = req.params.nome
        var id = req.query.id
        
        var busca
        if (nome) {
            busca = await Produto.find({nome: {$regex: nome, $options: "i"}})
        }
        else if (id) {
            busca = await Produto.find({_id: id})
        }
        else {
            busca = await Produto.find()
        }

        return res.send(busca)
    }
    catch(e){
        console.log(e)
    }
})

route.post("/produto", async function(req, res){
    try
    {
        var {codigoInterno, nome, valor, categoria, quantidade, descricao} = req.body
        
        if (codigoInterno == undefined || codigoInterno == "")
            return res.send({error:"O código não pode ser nulo."})

        if (nome == undefined || nome == "")
            return res.send({error:"O nome não pode ser nulo."})

        if (valor == undefined || valor == "")
            return res.send({error:"O valor não pode ser nulo."})

        if (quantidade == undefined || quantidade == "")
            return res.send({error:"A quantidade não pode ser nula."})

        var produto_inserido = await Produto.create({codigoInterno, nome, valor, categoria, quantidade, descricao})
        
        if (produto_inserido)
            return res.send({message:"Produto inserido com sucesso!", produto_inserido})
    }
    catch (e) {
        console.log(e)
    } 
})

route.put("/produto", async (req, res) => {
    try 
    {
        var {id, codigoInterno, nome, valor, categoria, quantidade, descricao} = req.body

        if (id == undefined || id == "")
            return res.send({error:"O id não pode ser nulo."})

        if (codigoInterno == undefined || codigoInterno == "")
            return res.send({error:"O código não pode ser nulo."})

        if (nome == undefined || nome == "")
            return res.send({error:"O nome não pode ser nulo."})

        if (valor == undefined || valor == "")
            return res.send({error:"O valor não pode ser nulo."})

        if (quantidade == undefined || quantidade == "")
            return res.send({error:"A quantidade não pode ser nula."})

        await Produto.findByIdAndUpdate(id, {codigoInterno, nome, valor, categoria, quantidade, descricao})
        var produto_alterado = await Produto.findOne({_id: id})

        return res.send({message: "Alteração realizada com sucesso!", produto_alterado})
    }
    catch (e) {
        console.log(e)
    }

})

route.delete("/produto", async (req, res)=>{
    try
    {
        var { id } = req.body
        if (id == undefined || id == "")
            return res.send({error: "Id do produto não encontrado."})

        await Produto.deleteOne({_id:id})

        return res.send({message: "Produto removido com sucesso!"})
    }
    catch(e){
        console.log(e)
    }
})

module.exports = app => app.use("/api", route)