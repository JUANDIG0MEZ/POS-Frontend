import {FaHome, FaBox, FaUser, FaShoppingCart, FaCashRegister, FaReact, FaCaretDown, FaCaretUp} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'
const navItems = {
    'Inicio': {
        icon: <FaHome />,
        to: '/'
    },
    'Productos': {
        icon: <FaBox />,
        to: '/inventario',
        children: [
            { label: 'Inventario', to: '/inventario' },
            { label: 'Categorías', to: '/categorias' },
            { label: 'Ajuste de inventario', to: '/ajuste-inventario/historial'}
        ]
    },
    'Compras': {
        icon: <FaShoppingCart />,
        to: '/compras',
        children: [
            { label: 'Nueva compra', to: '/comprar'},
            { label: 'Historial', to: '/compras/historial'}
        ]
    },
    'Ventas': {
        icon: <FaCashRegister />,
        to: '/ventas' ,
        children: [
            { label: 'Nueva venta', to: '/vender'},
            { label: 'Historial', to: '/ventas/historial' }
        ]
    },
    'Contactos': {
        icon: <FaUser />,
        to: '/clientes',
        children: [
            { label: 'Contactos', to: '/contactos' },
        ]
    },

}

export default function HeaderNav() {

    const [openItem, setOpenItem] = useState(null)

    function toggleItem (label) {
        if (openItem === label){
            setOpenItem(null)
        }
        else {
            setOpenItem (label)
        }
    }

    return (
        <nav className='flex flex-col bg-black justify-between p-3 text-xl px-6 min-h-screen w-60'>
      <h1 className='flex font-bold text-white items-center gap-2 mx-auto'>
        <FaReact className='animate-spin rain' />
        PersonalPos
      </h1>

      <ul className='flex flex-col gap-3
      '>
        {
          Object.entries(navItems).map(([label, item], index) => (
            <li key={index} className="text-white ">
              {
                item.children ? (
                  <button
                    onClick={() => toggleItem(label)}
                    className="flex items-center gap-3 w-full text-left hover:text-gray-300 hover:bg-gray-800 hover:font-bold p-1 rounded"
                  >
                    {item.icon}
                    {label}
                    <span className="ml-auto">{openItem === label ? <FaCaretUp/> : <FaCaretDown/>}</span>
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${isActive ? "font-bold" : "font-normal"} flex items-center gap-3 hover:text-gray-300 hover:bg-gray-800 p-1 rounded`
                    }
                  >
                    {item.icon}
                    {label}
                  </NavLink>
                )
              }

              {/* Subitems */}
              {
                openItem === label && item.children && (
                  <ul className="ml-6 mt-2 flex flex-col gap-2">
                    {
                      item.children.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.to}
                            className="block px-2 py-1 hover:bg-gray-800 rounded"
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
            </li>
          ))
        }
      </ul>

      <NavLink to='/perfil' className='mx-auto'>
        <p className='flex items-center text-white gap-4 mt-8'>Juan Diego <FaUser /></p>
      </NavLink>
    </nav>
    )
}