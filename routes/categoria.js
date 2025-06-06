const express = require("express")
const route = express.Router()

const Categoria = require("../models/categoria")

route.get("/categoria{/:categoria}", async function(req, res){
    try
    {
        var categoria = req.params.categoria
        var id = req.query.id
        
        var busca
        if (categoria) {
            busca = await Categoria.find({categoria: {$regex: categoria, $options: "i"}})
        }
        else if (id) {
            busca = await Categoria.find({_id: id})
        }
        else {
            busca = await Categoria.find()
        }

        return res.send(busca)
    }
    catch(e){
        console.log(e)
    }
})

route.post("/categoria", async function(req, res){
    try
    {
        var {categoria, descricao} = req.body
    
        if (categoria == undefined || categoria == "")
            return res.send({error:"A categoria não pode ser nula."})

        var categoria_inserida = await Categoria.create({categoria, descricao})
        
        if (categoria_inserida)
            return res.send({message:"Categoria inserida com sucesso!", categoria_inserida})
    }
    catch (e) {
        console.log(e)
    } 
})

route.put("/categoria", async (req, res) => {
    try 
    {
        var {id, categoria, descricao} = req.body

        if(id == undefined || id == "")
            return res.send({error:"O id não pode ser nulo"})

        if (categoria == undefined || categoria == "")
            return res.send({error: "A categoria não pode ser nula."})

        await Categoria.findByIdAndUpdate(id, {categoria, descricao})
        var categoria_alterada = await Categoria.findOne({_id: id})

        return res.send({message: "Alteração realizada com sucesso!", categoria_alterada})
    }
    catch (e) {
        console.log(e)
    }

})

route.delete("/categoria", async (req, res)=>{
    try
    {
        var { id } = req.body
        if (id == undefined || id == "")
            return res.send({error: "Id da categoria não encontrado."})

        await Categoria.deleteOne({_id:id})

        return res.send({message: "Categoria removida com sucesso!"})
    }
    catch(e){
        console.log(e)
    }
})

module.exports = app => app.use("/api", route)