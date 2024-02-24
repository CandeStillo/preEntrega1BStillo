const express = require("express")

const ProductManager=require('./ProductManager.js')

const PORT = 3000

const app = express()

const um=new ProductManager()

app.get("/", (req, res)=>{
    res.send("Server Básico con Express...!!!")
})


app.get("/products", (req, res)=>{
    let productos = um.getProducts()

    let {limit} = req.query
    
    let resultado = productos
    if(limit && limit>0){
        resultado = resultado.slice(0, limit)
    }

    res.json(resultado)
})



app.get("/products/:pid", (req, res) => {
    let productos = um.getProducts()

    let {pid} = req.query

    const productFind = productos.find(product => product.id == pid)

    if (!productFind) {
        console.log(`No se encontró ningún producto con el id ${pid}.`);
        res.status(404).json({ error: `No se encontró ningún producto con el id ${pid}.` }); // Enviar una respuesta de error con estado 404
        return;
    }

    res.json(productFind)
})

app.listen(PORT, ()=>{
    console.log(`Server online en puerto ${PORT}`);
})