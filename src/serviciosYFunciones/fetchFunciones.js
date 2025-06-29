import { toast } from 'sonner'


async function checkResponse(response) {
    const res = await response.json();
    if (res.success === true) {
        return res;
    }
    else {
        throw new Error(res.message);
    }
}

async function basicFetch(url) {
    const res = await fetch(url, {
        credentials: 'include'
    })
    return await checkResponse(res)
}


export async function otherFetch(url, method, body) {
    const res = await fetch(url, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        credentials: 'include'
    })
    return await checkResponse(res)
}




export async function fetchFiles(url){
    const res = await fetch(url, {
        credentials: 'include'
    })
    return await checkResponse(res)
}




export async function toastFetchPromise(promise, cb) {
    toast.promise(promise,
        {
            loading: 'Cargando productos',
            success: (res) => {
                cb(res.data)
                return `${res.message}`;
            },
            error: (error) => {
                return error.message
            }
        }   
    )
}



export function fetchManager(url, cb, method="GET", body = null) {
    if (method === "GET") {
        toastFetchPromise(basicFetch(url), cb)
    }
    else if (body && ["POST", "PATCH", "DELETE"].includes(method)) {
        toastFetchPromise(otherFetch(url, method, body), cb)
    }
    else {
        toast.info("Peticion mal construida")
    }

}



export async function otherFetchFiles(url, method, formData) {
    const res = await fetch(url, {
        method: method,
        body: formData,
        credentials: 'include'
    })
    return await checkResponse(res)
}

export function fetchFilesManager(url, cb, method="GET", formData = null) {
    if (method === "GET"){
        toastFetchPromise(otherFetchFiles(url), cb)
    }
    else if (formData && ["POST", "PATCH", "DELETE"].includes(method)) {
        toastFetchPromise(otherFetchFiles(url, method, formData), cb)
    }
    else {
        toast.info("Peticion mal construida")
    }
}



// async function crearProductoFetch(nuevoProducto, setProductos, productos, imagenes){

    


    


//     return toast.promise(
//         fetch("http://localhost:3000/api/v1/productos",{
//             method: "POST",
//             body: formData
//         })
//         .then(async response => {
//             if (!response.ok){
//                 throw new Error(`Error ${response.status}: ${response.statusText}`)
//             }
//             const data = await response.json()
//             if (data.status === 'success'){

//                 return data.body
//             }
//             else {
//                 throw new Error(data.error)
//             }
//         })
//     , {
//         loading: "Creando producto",
//         success: (data) => {
//             setProductos([data, ...productos])
//             return "Producto creado"
//         },
//         error: (error) => error.message
//     })
// }
