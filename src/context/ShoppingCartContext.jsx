import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useEffect } from "react";

const ShoppingCartContext= createContext({});
const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartProvider  = ({children}) => {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [isOpen,setIsOpen] =useState(false);

    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
      }, [cartItems]);
    
    const openCart=() =>{
        setIsOpen(true);
    }
    const closeCart=() =>{
        setIsOpen(false);
    }
    const cartQuantity=cartItems.reduce((quantity,item) =>(
        item.quantity + quantity
    ),0)

    const getItemQuantity =(id)=>{
        return cartItems.find((item)=> item.id === id)?.quantity || 0;
    };
    const increaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)) {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            } else {
                return [...currItems, { id, quantity: 1 }];
            }
        });
    };
    const decreaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            const existingItem = currItems.find((item) => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    return currItems.filter((item) => item.id !== id);
                } else {
                    return currItems.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity: item.quantity - 1 };
                        } else {
                            return item;
                        }
                    });
                }
            } else {
                return currItems;
            }
        });
    };
    const removeItemFromCart=(id)=>{
        setCartItems((currItems) => currItems.filter((item) => item.id !== id));
    }
  return (
        <ShoppingCartContext.Provider value={{cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItemFromCart,
        closeCart,
        openCart,
        cartQuantity,
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
  );
}
export default ShoppingCartProvider ;

export const useShoppingCart=() =>{
    return useContext(ShoppingCartContext);
};
