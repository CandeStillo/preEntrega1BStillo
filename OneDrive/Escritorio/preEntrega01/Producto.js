class Producto {
    static cantidadProductos = 0

    constructor (title, description, price, thumbnail, id, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.id = id
        this.stock = stock

        Producto.cantidadProductos++
    }
    static verCantidadProductos(){
        return this.cantidadProductos
    }
}

let producto01 = new Producto ("Iphone 11", "Iphone 11 64GB", "$200", "Pic", 1, 10)
let producto02 = new Producto ("Iphone 12", "Iphone 12 125GB", "$400", "Pic", 2, 10)
let producto03 = new Producto ("Iphone 12", "Iphone 12 125GB", "$400", "Pic", 2, 10)


console.log(producto01)
console.log(producto03)
console.log(Producto.verCantidadProductos())

class ProductoManager {
    constructor(){
        this.productos = []
    }

    addProducto(title, price){
        //Validaciones

        let existe = this.productos.find(productos => productos.title === title)
        if (existe) {
            console.log(`El producto ${title} ya existe...!`)
            return
        }

        //id unico autoincremental

        let id = 1
        if(this.productos.length > 0){
            id = this.productos [this.productos.length - 1].id +1
        }

        let nuevoProducto = {title, id, price};
        this.productos.push(nuevoProducto)
    }
    verProducto(){
        return this.productos
    }

    verProductoById(id){ //Retornar solo en el caso de que exista
        let producto = this.productos.find(p => p.id === id)
        if (!producto) {
            console.log(`No existen productos con el id ${id}...!`)
            return
        }
        return producto
    }
}

let pm = new ProductoManager ()
pm.addProducto("Iphone 14", "$500")

console.log(pm.verProductoById(1))