const express = require("express")
const route = express.Router()

const Venda = require("../models/venda")

route.get("/venda{/:numero}", async function(req, res){
    try
    {
        var numero = req.params.numero
        var id = req.query.id
        
        var busca
        if (numero) {
            busca = await Venda.find({numeroNota: numero})
        }
        else if (id) {
            busca = await Venda.find({_id: id})
        }
        else {
            busca = await Venda.find()
        }

        return res.send(busca)
    }
    catch(e){
        console.log(e)
    }
})

route.post("/venda", async function(req, res){
    try
    {
        var {numeroNota, cliente, produtos, valorTotal} = req.body
        
         if (numeroNota == "" || numeroNota == undefined)
            return res.send({mensagem: "O numero da nota não pode ser nulo."})
        
        if (cliente.cpf == "" || cliente.cpf == undefined) 
            return res.send({mensagem: "O cpf não pode ser nulo."})
        
        if(cliente.nome == "" || cliente.nome == undefined)
            return res.send({mensagem: "O nome não pode ser nulo."})

        if(cliente.endereco.rua == "" || cliente.endereco.rua == undefined)
            return res.send({mensagem: "A rua não pode ser nula."})

        if(cliente.endereco.numero == "" || cliente.endereco.numero == undefined)
            return res.send({mensagem: "O número da residência não pode ser nulo."})

        if(cliente.endereco.bairro == "" || cliente.endereco.bairro == undefined)
            return res.send({mensagem: "O bairro não pode ser nulo."})

        if(cliente.endereco.cidade == "" || cliente.endereco.cidade == undefined)
            return res.send({mensagem: "A cidade não pode ser nula."})

        if(cliente.endereco.estado == "" || cliente.endereco.estado == undefined)
            return res.send({mensagem: "O estado não pode ser nulo."})

        if(cliente.endereco.cep == "" || cliente.endereco.cep == undefined)
            return res.send({mensagem: "O cep não pode ser nulo."})

        if(cliente.email == "" || cliente.email == undefined)
            return res.send({mensagem: "O e-mail do cliente não pode ser nulo."})
        
        if(produtos.some(produto => produto.codigoInterno == "" || produto.codigoInterno == undefined))
            return res.send({mensagem: "O código do produto não pode ser nulo."})

        if(produtos.some(produto => produto.nome == "" || produto.nome == undefined))
            return res.send({mensagem: "O nome do produto não pode ser nulo."})
        
        if(produtos.some(produto => produto.quantidade == "" || produto.quantidade == undefined))
            return res.send({mensagem: "A quantidade do produto não pode ser nula."})
        
        if(produtos.some(produto => produto.valorUnitario == "" || produto.valorUnitario == undefined))
            return res.send({mensagem: "O valor unitário do produto não pode ser nulo."})
        
        if(valorTotal == "" || valorTotal == undefined)
            return res.send({mensagem: "O valor total não pode ser nulo."})
        
        var venda_inserida = await Venda.create({numeroNota, cliente, produtos, valorTotal})
        
        if (venda_inserida)
            return res.send({message:"Venda inserida com sucesso!", venda_inserida})
    }
    catch (e) {
        console.log(e)
    } 
})

route.put("/venda", async function(req, res){
    try
    {
        var {id, numeroNota, cliente, produtos, valorTotal} = req.body

        if (id == "" || id == undefined)
            return res.send({mensagem: "O id da venda não pode ser nulo."})
        
        if (numeroNota == "" || numeroNota == undefined)
            return res.send({mensagem: "O numero da nota não pode ser nulo."})

        if (cliente.cpf == "" || cliente.cpf == undefined) 
            return res.send({mensagem: "O cpf não pode ser nulo."})
        
        if(cliente.nome == "" || cliente.nome == undefined)
            return res.send({mensagem: "O nome não pode ser nulo."})

        if(cliente.endereco.rua == "" || cliente.endereco.rua == undefined)
            return res.send({mensagem: "A rua não pode ser nula."})

        if(cliente.endereco.numero == "" || cliente.endereco.numero == undefined)
            return res.send({mensagem: "O número da residência não pode ser nulo."})

        if(cliente.endereco.bairro == "" || cliente.endereco.bairro == undefined)
            return res.send({mensagem: "O bairro não pode ser nulo."})

        if(cliente.endereco.cidade == "" || cliente.endereco.cidade == undefined)
            return res.send({mensagem: "A cidade não pode ser nula."})

        if(cliente.endereco.estado == "" || cliente.endereco.estado == undefined)
            return res.send({mensagem: "O estado não pode ser nulo."})

        if(cliente.endereco.cep == "" || cliente.endereco.cep == undefined)
            return res.send({mensagem: "O cep não pode ser nulo."})

        if(cliente.email == "" || cliente.email == undefined)
            return res.send({mensagem: "O e-mail do cliente não pode ser nulo."})
        
        if(produtos.some(produto => produto.codigoInterno == "" || produto.codigoInterno == undefined))
            return res.send({mensagem: "O código do produto não pode ser nulo."})

        if(produtos.some(produto => produto.nome == "" || produto.nome == undefined))
            return res.send({mensagem: "O nome do produto não pode ser nulo."})
        
        if(produtos.some(produto => produto.quantidade == "" || produto.quantidade == undefined))
            return res.send({mensagem: "A quantidade do produto não pode ser nula."})
        
        if(produtos.some(produto => produto.valorUnitario == "" || produto.valorUnitario == undefined))
            return res.send({mensagem: "O valor unitário do produto não pode ser nulo."})
        
        if(valorTotal == "" || valorTotal == undefined)
            return res.send({mensagem: "O valor total não pode ser nulo."})
        
        await Venda.findByIdAndUpdate(id, {numeroNota, cliente, produtos, valorTotal})
        var venda_alterada = await Venda.findOne({_id: id})
        
        return res.send({message: "Alteração realizada com sucesso!", venda_alterada})
    }
    catch (e) {
        console.log(e)
    } 
})

route.delete("/venda", async (req, res)=>{
    try
    {
        var { id } = req.body
        if (id == undefined || id == "")
            return res.send({error: "Id da venda não encontrado."})

        await Venda.deleteOne({_id:id})

        return res.send({message: "Venda removida com sucesso!"})
    }
    catch(e){
        console.log(e)
    }
})


module.exports = app => app.use("/api", route)