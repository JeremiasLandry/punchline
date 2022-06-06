import { createContext } from 'react';
import { useState } from 'react' 


export const CartContext = createContext()


export const CartProvider = ({children}) => {

    const [cart, setCart] = useState(() => {
      const stickyValue = window.localStorage.getItem('cart');
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : [] ;
    });

    const addItem = (item) => {
      setCart( [...cart, item] )

      let prev_items = JSON.parse(localStorage.getItem('cart')) || [];
        prev_items.push(item);
        localStorage.setItem(`cart`, JSON.stringify(prev_items));
    }
  
    const isInCart = (id) =>{
      return cart.some(prod => prod.id === id)
    }
  
    const cartQuantity = () => {
      return cart.reduce((acc, prod) => acc += prod.count, 0)
    }

    const cartTotal = () =>{
      return cart.reduce((acc,prod) => acc += prod.price * prod.count,0)
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem('cart');
    }

    const removeItem = (id) => {
      setCart( cart.filter((prod) => prod.id !== id) )
      let prev_items = JSON.parse(localStorage.getItem('cart'))
      var removeIndex = prev_items.map(item => item.id).indexOf(id);
      ~removeIndex && prev_items.splice(removeIndex, 1);
      localStorage.setItem(`cart`, JSON.stringify(prev_items));
    }

    return(
    <CartContext.Provider value={{
      cart,
      addItem,
      isInCart,
      cartQuantity,
      clearCart,
      removeItem,
      cartTotal
      }}>
           {children} 
    </CartContext.Provider>
    )
}