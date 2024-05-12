import React from 'react';
import { Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import Button from 'react-bootstrap/Button';
import FormatCurrency from './FormatCurrency';
import items from "../Data/items.json";

const CartItem = ({id,quantity}) => {
    const{removeItemFromCart} = useShoppingCart();
    const item =items.find((i) => i.id === id);
    if(item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt="cart-img"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {FormatCurrency(item.price)}
        </div>
      </div>
      <div>{FormatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeItemFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

export default CartItem;
