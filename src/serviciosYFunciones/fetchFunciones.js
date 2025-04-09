import { toast } from 'sonner'


async function checkResponse(response) {
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const res = await response.json();

    if (res.success === true) {
        return res;
    }
    else {
        throw new Error(res.message);
    }
}


async function basicFetch(url) {
    const res = await fetch(url)
    return await checkResponse(res)
}


export async function otherFetch(url, method, body) {
    const res = await fetch(url, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
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
                return error}
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