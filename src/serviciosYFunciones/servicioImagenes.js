import { toast } from 'sonner'


export function obtenerImagenes(id, setUrlsImagenes){
    toast.promise(
        fetch(`http://localhost:3000/api/v1/productos/${id}/imagenes`)
        .then(async response => {
            if (!response.ok){
                throw new Error("Error al cargar la imagen")
            }

            const data = await response.json()

            if (data.status === "success"){
                return data;
            }
            else {
                throw new Error(data.message)
            }}),
        {
            loading: "Cargando imagen...",
            success: (data) => {
                setUrlsImagenes(data.body)
                return data.message
            },
            error: (error) => error
        }

    )

}
