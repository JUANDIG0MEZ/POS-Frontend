import { faker } from '@faker-js/faker'


export function cargarProductos() {
    const productos = []
    for (let i = 0; i < 500; i++) {
        productos.push({
            id: i,
            nombre: faker.commerce.productName(),
            marca: faker.company.name(),
            categoria: faker.commerce.department(),
            medida: faker.helpers.arrayElement(['Kg', 'Unidad', 'Litro', 'Metro Cuadrado']),
            precioCompra: faker.commerce.price({min: 10000, max: 50000}),
            precioVenta: faker.commerce.price({min: 50000, max: 100000}),
            cantidad: faker.number.int({min: 1, max: 100}),
            total: faker.number.int({min: 100000000, max: 100000000000})
            })
    }
    return productos

}

export function cargarClientes() {
    const clientes = []

    for (let i = 0; i < 10; i++) {
        clientes.push({
            id: i,
            nombre: faker.person.fullName(),
            direccion: faker.location.streetAddress(),
            telefono: faker.phone.number(),
            email: faker.internet.email(),
            tipo: faker.helpers.arrayElement(['Proveedor', 'Cliente', 'Ambos']),
            porPagarle: faker.finance.amount(),
            debe: faker.finance.amount()            
        })
    }
    return clientes
}


export function cargarMedidas() {
    return ['Kg', 'Unidad', 'Litro']
}


export function cargarCategorias() {
    return ['Alimentos', 'Bebidas', 'Limpieza', 'Hogar', 'Electrodomesticos']
}


export function cargarMarcas() {
    return ['Pepsi', 'Coca Cola', 'Nestle', 'P&G', 'Unilever']
}

export function tiposClientes() {
    return ['Proveedor', 'Cliente', 'Ambos']
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