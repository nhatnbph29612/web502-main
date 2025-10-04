import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import Layout from './Layout'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path='product/:id' element={<ProductDetail/>} />
        </Route>
      </Routes>

      <Toaster/>
    </>
  )
}

export default App
