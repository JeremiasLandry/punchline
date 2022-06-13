import './App.css';
import NavBar from './components/NavBar/NavBar.js';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Cart from './components/Cart/Cart'
import { CartProvider } from './context/CartContext'
import Checkout from './components/Checkout/Checkout'
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import Shop from './components/Shop/Shop';
import Home from './components/Home/Home';

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/category/:categoryId' element={<ItemListContainer/>}/>
            <Route path='/category/:categoryId/:pageNumber' element={<ItemListContainer/>}/>
            <Route path='/page/:pageNumber' element={<ItemListContainer/>}/>
            <Route path='/tienda/:categoryId/:pageNumber' element={<Shop/>}/>
            <Route path='/tienda/:categoryId' element={<Shop/>}/>
            <Route path='/item/:itemId' element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/contacto' element={<Contact/>}/>
            <Route path='*' element={<Navigate to='/'/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
