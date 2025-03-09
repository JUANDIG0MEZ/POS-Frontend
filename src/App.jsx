import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './paginas/Home'
import Inventario from './paginas/Inventario'
import Clientes from './paginas/Clientes'
import Compras from './paginas/Compras'
import Comprar from './paginas/Comprar'
import Compra from './paginas/Compra'
import Ventas from './paginas/Ventas'
import Vender from './paginas/Vender'
import Venta from './paginas/Venta'
import Perfil from './paginas/Perfil'
import './App.css'
import Dashboard from './componentes/Dashboard'
import Cliente from './paginas/Cliente'
import {Toaster} from 'sonner'
function App() {
  return (
    <>
      <Toaster position='top-right' closeButton richColors/>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard />}>
            <Route path= '/' element={<Home />} />
            <Route path= '/inventario' element={<Inventario />} />
            <Route path= '/clientes' element={<Clientes />} />
            <Route path= '/compras' element={<Compras />} />
            <Route path= '/comprar' element={<Comprar />} />
            <Route path= '/ventas' element={<Ventas />} />
            <Route path= '/vender' element={<Vender />} />
            <Route path = '/venta/:id' element={<Venta />} />
            <Route path = '/compra/:id' element={<Compra/>} />
            <Route path = '/cliente/:id' element={<Cliente />} />
            <Route path = '/perfil' element={<Perfil />} />
            <Route path = '*' element={<h1>404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
