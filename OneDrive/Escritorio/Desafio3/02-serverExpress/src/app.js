const express = require("express")
const productsRouter = require ("./routes/productos.router.js")
const cartRouter = require ("./routes/carts.router.js")
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)


app.get("/", (req, res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})




app.listen(PORT, ()=>{
    console.log(`Server online en puerto ${PORT}`);
})