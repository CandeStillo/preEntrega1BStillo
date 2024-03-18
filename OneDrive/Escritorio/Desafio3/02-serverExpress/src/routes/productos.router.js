const ProductManager = require ('../ProductManager');
const {join} = require ("path");
const { getProductos, saveProductos } = require('../varios');
const {Router} = require ('express')
const router = Router()

let rutaProductos = join (__dirname, "..", "data", "products.json")

const productManager = new ProductManager (rutaProductos)


router.get ("/", (req, res) => {

    let productos = productManager.getProductos()

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({productos})
})

router.post('/', (req, res) => {
    let {nombre} = req.body
    if(!nombre){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'Complete el nombre'})
    }

    let nuevoProducto = productManager.createProducto(req.body)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({nuevoProducto})
})

router.get("/products/:pid", (req, res)=>{
    let productos = productManager.getProductos()

    let {pid} = req.params
    
    let productFind = productos.find(product => product.id == pid)
    if(!productFind){
        console.log(`No se encontro ningun producto con el id ${pid}`)
        res.status(404).json({error: `No se encontro ningun prroducto con el id ${pid}`})
        return;
    }

    res.json(productFind)
})



router.delete("/:id", (req, res) => {
    let id = Number(req.params.id) //verificar si es numérico
    if (isNaN(id)){
        return res.status(400).json({error:`El id debe ser numérico`})
    }
    let productos = productManager.getProductos() //Buscar usuario y ver si existe
    let indiceProducto = productos.findIndex(p => p.id === id) //Posicion de arreglo
    if (indiceProducto === -1){
        return res.status(400).json({error:`No existen usuarios con el id ${id}`})
    }

    let productoEliminado = productos [indiceProducto]
    productos.splice(indiceProducto, 1)

    productManager.saveProductos(productos)
    
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({productoEliminado}) //json con productos
    
})
module.exports = router