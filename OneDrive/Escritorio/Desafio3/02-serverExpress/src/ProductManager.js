const fs=require("fs")



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

    async saveProductos() {
        try {
            fs.writeFile(this.filePath, JSON.stringify(this.productos, null, 2));  
        } catch (error) {
            console.log('Error al guardar los productos:', error.message);
        }
        ;
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
pm.addProducto("Iphone 1", "Iphone 1 15gb", "$2000", "Pic", 34531, 40);
pm.addProducto("Iphone 2", "Iphone 2 64gb", "$4000", "Pic", 9837, 8);
pm.addProducto("Iphone 3", "Iphone 3 125gb", "$10000", "Pic", 65783, 22);
pm.addProducto("Iphone 1", "Iphone 4 64gb", "$9000", "Pic", 7879, 32);

console.log(pm.verProductoById(1));
