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

export async function cargarCliente(id){
    return await fetch(`http://localhost:3000/api/v1/clientes/${id}`)
        .then(response => response.json())
        .then(data =>{
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
    return await fetch('http://localhost:3000/api/v1/facturas/compras')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}



export async function cargarFacturasVenta(){
    
    return await fetch('http://localhost:3000/api/v1/facturas/ventas')
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

export async function clientePagos(id){
    return await fetch(`http://localhost:3000/api/v1/clientes/${id}/pagos`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function clienteCompras(id){
    return await fetch(`http://localhost:3000/api/v1/clientes/${id}/compras`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function clienteAbonos(id){
    return await fetch(`http://localhost:3000/api/v1/clientes/${id}/abonos`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}

export async function clienteVentas(id){
    return await fetch(`http://localhost:3000/api/v1/clientes/${id}/ventas`)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error('Error:', error))
}