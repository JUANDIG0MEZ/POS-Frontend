import { faker } from '@faker-js/faker'


export function cargarProductos() {
    const productos = []
    console.time('escritura')
    for (let i = 0; i < 500; i++) {
        productos.push({
            id: i,
            nombre: faker.commerce.productName(),
            marca: faker.company.name(),
            categoria: faker.commerce.department(),
            medida: faker.helpers.arrayElement(['Kg', 'Unidad', 'Litro']),
            precioCompra: faker.commerce.price({min: 10000, max: 50000}),
            precioVenta: faker.commerce.price({min: 50000, max: 100000}),
            cantidad: faker.number.int({min: 1, max: 100}),
            total: faker.number.int({min: 100000000, max: 100000000000})
            })
    }
    console.timeEnd('escritura')
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
            tipo: faker.helpers.arrayElement(['Proveedor', 'Cliente', 'Ambos'])
        })
    }
    return clientes
}

