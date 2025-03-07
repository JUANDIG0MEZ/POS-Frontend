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