import { useState } from "react"
import InputText from "../../componentes/InputText"
import { FaReact } from "react-icons/fa"
import { Link } from "react-router-dom"
import InputPassword from "../../componentes/InputPassword"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function Confirmar () {
    const [ password1, setPassword1] = useState("")
    const [ password2, setPassword2] = useState("")


    const navigate = useNavigate();

    function cbInicioSesion(res) {
      navigate("/inventario")
    }

    function iniciarSesion() {
      if (password1!== password2) return toast.warning('Las contrasenias deben ser iguales')

      if (password2.length < 8) return toast.warning('La contraseña debe tener al menos 8 caracteres')
      if (!/[a-z]/.test(password2)) return toast.warning('La contraseña debe tener al menos una letra minúscula')
      if (!/[A-Z]/.test(password2)) return toast.warning('La contraseña debe tener al menos una letra mayúscula')
      if (!/\d/.test(password2)) return toast.warning('La contraseña debe tener al menos un número')
      if (!/[^A-Za-z\d]/.test(password2)) return toast.warning('La contraseña debe tener al menos un carácter especial')

      fetchManager("http://localhost:3000/api/v1/autenticacion/ingresar", cbInicioSesion, "POST", { password: password1 })
    }

    return (
    <>
      <div className="flex max-w-sm sm:w-full sm:max-w-sm mx-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="max-w-sm mx-auto">
            <div className="h-10 w-10 mx-auto">
                <FaReact className='animate-spin rain w-full h-full'/>
            </div>
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Crear tu contrasenia
          </h2>
        </div>

        <div className="flex flex-col gap-10 mt-10 mx-auto max-w-sm sm:w-full sm:max-w-sm">
            <InputPassword label='Contrasenia' value={password1} setValue={setPassword1}/>
            <InputPassword label='Confirmar contrasenia' value={password2} setValue={setPassword2}/>
                        
        </div>
        
        <button onClick={() => iniciarSesion()} className="w-full font-semibold bg-black rounded-lg hover:shadow-lg text-white py-1 hover:bg-slate-800 mt-4">Confirmar</button>
      </div>
    </>
    )
}