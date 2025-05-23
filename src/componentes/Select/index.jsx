

export default function Select(props) {

    function handleChange(e) {
        if (e.target.value === "default") {
            return
        }
        const valor = e.target.value
        console.log("Se seleccionó el valor:", valor)
    }
    
    //bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    return (
        <form className="max-w-sm mx-auto">
            <select
                className="py-2.5 px-4 boton-normal"
                onClick={handleChange}
                id="countries">
                <option value="default" disabled selected>{props.label}</option>
                {
                    Object.keys(props.objeto).map( key  => {
                        return (
                            <option key={key} value={key}>{props.objeto[key]}</option>
                        )
                    })
                }
            </select>
        </form>
    )
}