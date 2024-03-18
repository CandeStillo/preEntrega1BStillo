const {getProductos, saveProductos} = require ("./varios.js")

class ProductoManager {
    constructor( ruta){
        this.ruta = ruta
    }
  
    getProductos(){
        return getProductos(this.ruta)
    }
    

    // async saveProductos() {
    //     try {
    //         fs.writeFile(this.filePath, JSON.stringify(this.productos, null, 2)); 
    //     } catch (error) {
    //         console.log('Error al guardar los productos:', error.message);
    //     }
        
    // }

    createProducto(title, description, price, thumbnail, stock){
        //Validaciones

        let existe = productos.find(productos => productos.title === title)
        if (existe) {
            console.log(`El producto ${title} ya existe...!`)
            return
        }
        
        //id unico autoincremental
        
        let id = 1
        let productos = this.getProductos()
        if(productos.length > 0){
            id = Math.max(...productos.map(p => p.id)) + 1
        }
        
        let nuevoProducto = {title, id, price, thumbnail, id, stock};
        productos.push(nuevoProducto)
        // this.saveProductos();
        saveProductos(this.ruta, productos)
    }
    // verProducto(){
    //     try {
    //         return this.productos
            
    //     } catch (error) {
    //         console.log(`No se han podido mostrar los productos: `, error.message);
    //     }
    // }
    
    verProductoById(id){ //Retornar solo en el caso de que exista
        let producto = this.productos.find(p => p.id === id)
        if (!producto) {
            console.log(`No existen productos con el id ${id}...!`)
            return
        }
        return producto
    }
    

}




module.exports = ProductoManager

