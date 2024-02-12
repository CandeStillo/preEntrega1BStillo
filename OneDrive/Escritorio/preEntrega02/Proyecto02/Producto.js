const fs=require("fs")


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

// let producto01 = new Producto ("Iphone 11", "Iphone 11 64GB", "$200", "Pic", 1, 10)
// let producto02 = new Producto ("Iphone 12", "Iphone 12 125GB", "$400", "Pic", 2, 10)
// let producto03 = new Producto ("Iphone 12", "Iphone 12 125GB", "$400", "Pic", 2, 10)



class ProductoManager {
    constructor(filePath){
        this.filePath = filePath
        this.productos = []
        this.loadProductos();
    }

    loadProductos(){
        fs.readFile(this.filePath, {encoding: "utf8"}, (error, data) =>{
            if (error) {
                console.log("Error al cargar los productos:", error.message)
                return;
            }
            this.productos = JSON.parse(data);
        })
    }

    saveProductos() {
        fs.writeFile(this.filePath, JSON.stringify(this.productos, null, 2), (error) => {
            if (error) {
                console.log('Error al guardar los productos:', error.message);
            }
        });
    }

    addProducto(title, description, price, thumbnail, stock){
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
        
        let nuevoProducto = {title, id, price, thumbnail, id, stock};
        this.productos.push(nuevoProducto)
        this.saveProductos();
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
    
    deleteProduct(id){
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index === -1) {
            console.log(`No existe un producto con el id ${id}...!`);
            return;
        }
        this.productos.splice(index, 1);
        this.saveProductos();
        
    }
}

// let pm = new ProductoManager ()
// pm.addProducto("Iphone 14", "$500")

// console.log(Producto.verCantidadProductos())
// console.log(pm.verProductoById(1))

//Verificacion de uso
const filePath = 'productos.txt';
const pm = new ProductoManager(filePath);
pm.addProducto("Iphone 14", "Iphone 14 256GB", "$500", "Pic", 10);
console.log(pm.verProductoById(1));
