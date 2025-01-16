import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './paginas/Home'
import Inventario from './paginas/Inventario'
import Clientes from './paginas/Clientes'
import Compras from './paginas/Compras'
import Ventas from './paginas/Ventas'
import './App.css'
import Dashboard from './componentes/Dashboard'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard />}>
            <Route path= '/' element={<Home />} />
            <Route path= '/inventario' element={<Inventario />} />
            <Route path= '/clientes' element={<Clientes />} />
            <Route path= '/compras' element={<Compras />} />
            <Route path= '/ventas' element={<Ventas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
