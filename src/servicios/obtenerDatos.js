export async function cargarProductos() {    
    return await fetch('http://localhost:3000/api/v1/productos')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function cargarClientes() {
    return await fetch('http://localhost:3000/api/v1/clientes')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
    
}

export async function cargarMedidas() {
    return await fetch('http://localhost:3000/api/v1/productos/medidas')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function cargarCategorias() {
    return await fetch('http://localhost:3000/api/v1/productos/categorias')
        .then(response => response.json())
        .then(data => {
            return data
        })
}


export async function cargarMarcas() {
    return await fetch('http://localhost:3000/api/v1/productos/marcas')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function tiposClientes() {
    return await fetch('http://localhost:3000/api/v1/clientes/tipos')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function cargarFacturasCompra(){
    return await fetch('http://localhost:3000/api/v1/facturas/compra')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}



export async function cargarFacturasVenta(){
    
    return await fetch('http://localhost:3000/api/v1/facturas/venta')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function cargarFacturaVenta(id){
    
    return await fetch(`http://localhost:3000/api/v1/facturas/venta/${id}`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}


export async function cargarFacturaCompra(id){
    return await fetch(`http://localhost:3000/api/v1/facturas/compra/${id}`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}