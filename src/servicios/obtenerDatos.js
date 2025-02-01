import { faker } from '@faker-js/faker'


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


export function cargarFacturasCompra(){
    const facturas = []
        for (let i = 0; i < 10; i++) {
            const fecha = faker.date.recent();
            facturas.push({
                id: i,
                fecha: fecha.toLocaleDateString('es-ES'), // Formato día/mes/año
                hora: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), 
                cliente: faker.company.name(),
                porPagar: faker.finance.amount(),
                total: faker.finance.amount(),
                estado: faker.helpers.arrayElement(['Entregado', 'Por entregar']),
            })
        }
    return facturas
}


export function cargarFacturasVenta(){
    const facturas = []
        for (let i = 0; i < 10; i++) {
            const fecha = faker.date.recent();
            facturas.push({
                id: i,
                fecha: fecha.toLocaleDateString('es-ES'), // Formato día/mes/año
                hora: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), 
                cliente: faker.company.name(),
                direccion: faker.location.streetAddress(),
                porPagar: faker.finance.amount(),
                total: faker.finance.amount(),
                estado: faker.helpers.arrayElement(['Entregado', 'Por entregar']),
            })
        }
    return facturas
}

export function ejemploFacturaCompra(){
    const facturas ={
        info: [],
        data: []
    }


    facturas.info.push({
        id: 450,
        fecha: "23/12/2023",
        nombre: "juan diego gomez",
        direccion: faker.location.streetAddress(),
        telefono: faker.phone.number(),
        email: faker.internet.email(),
        estado: faker.helpers.arrayElement(['Entregado', 'Por entregar']),
        porPagar: faker.finance.amount(),
        total: faker.finance.amount()
    })


    for (let i = 0; i<10; i++){
        facturas.data.push({
            id: i, 
            nombre: faker.commerce.productName(),
            cantidad: faker.number.int({min: 1, max: 100}),
            precio: faker.commerce.price({min: 10000, max: 50000}),
            total: faker.commerce.price({min: 10000, max: 50000})
        })
    }
    return facturas
}