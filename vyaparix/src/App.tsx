import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Merchant from './pages/Merchant'
import ProductPage from './pages/ProductPage'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Account from './pages/Account'
import SellerInfo from './pages/SellerInfo'
import Navbar from './Components/navbar'
import MerchantPrompt from './Components/Modals/PromptIsMerchant'
import { useAuth } from './hooks/useAuth'
import AddProduct from './pages/AddProduct'
import Modal from './Components/Modals/Modal'
import { ModalProvider } from './hooks/useModal'
function App() {
  const { needsMerchantInfo, completeRegistration } = useAuth();
  return (
    <>

      <ModalProvider>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/productpage/:productID' element={<ProductPage />}></Route>
          <Route path='/addproduct' element={<AddProduct />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/merchant' element={<Merchant />}></Route>
          <Route path='/sellerinfo' element={<SellerInfo />}></Route>
          <Route path="/*" element={<Home />}></Route>


          </Routes>
          {needsMerchantInfo && <MerchantPrompt onSelect={completeRegistration} />}
          <Modal />
        </Router>
      </ModalProvider>
    </>
  )
}

export default App
