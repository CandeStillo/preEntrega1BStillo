const fs = require('fs')



function getProductos (ruta) {
    if (fs.existsSync(ruta)){
        return JSON.parse(fs.readFileSync(ruta, 'utf-8'))
    } else {
        return []
    }
}

function saveProductos (ruta, datos) {
    fs.writeFileSync(ruta, JSON.stringify(datos, null, 5))
}


module.exports = {getProductos, saveProductos}