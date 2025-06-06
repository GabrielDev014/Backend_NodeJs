const express = require("express")

var app = express()

app.use(express.json())

require('./routes/usuario')(app)
require('./routes/categoria')(app)
require('./routes/cliente')(app)
require('./routes/produto')(app)
require('./routes/venda')(app)

app.listen(3000, function()
{
    console.log("Servidor online!")
})