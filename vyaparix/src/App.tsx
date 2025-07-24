import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Merchant from './pages/Merchant'
import ProductPage from './pages/ProductPage'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Account from './pages/Account'
import SellerInfo from './pages/SellerInfo'

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path='/productpage' element={<ProductPage />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/merchant' element={<Merchant />}></Route>
          <Route path='/sellerinfo' element={<SellerInfo />}></Route>
          <Route path="/*" element={<Home />}></Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
