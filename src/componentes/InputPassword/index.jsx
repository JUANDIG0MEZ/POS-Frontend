import BotonIcono from "../BotonIcono"
import { useState } from "react"
import { FaEye } from "react-icons/fa"
export default function InputPassword({value, setValue, style}) {
    const [mostrarConstrasenia, setMostrarContrasenia] = useState(false)
    const establecerValor = (e) => {
        const nuevoValor = e.target.value;
        if (setValue) {
            setValue(nuevoValor);
        }
    }

    return (
        <div className={`relative ${style ? style : "flex-1"}`}>
            <label className="text-sm/6 font-medium text-gray-900 absolute -top-7 text-nowrap">{labelSeleccionado(props.label)}</label>

            <div className="flex gap-1">
                <input
                onChange={establecerValor}
                type={!mostrarConstrasenia ? "password" : "text"}
                value={value || ""}
                className={`px-3 py-1.5 text-base w-full rounded-lg borde-input`}/>

                <div onMouseDown={() => {setMostrarContrasenia(!mostrarConstrasenia)}}>

                    <BotonIcono texto={<FaEye/>}/>
                </div>
            </div>
            
        </div>
    )
}