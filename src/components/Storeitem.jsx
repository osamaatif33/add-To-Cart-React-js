import React from 'react'
import { Button, Card } from 'react-bootstrap';
import FormatCurrency from './FormatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

const Storeitem = ({id,price,name,imgUrl}) => {
    const{getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeItemFromCart}=useShoppingCart();
    const quantity=getItemQuantity(id);

    return (
        <Card>
            <Card.Img src={imgUrl} variant="top" style={{height:"200px",objectFit:"cover"}}/>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline">
                    <span className='fs-2'>{name}</span>
                    <span>{FormatCurrency(price)}</span>
                </Card.Title>
            </Card.Body>
            <div className='mt-auto' >
                {quantity === 0 ?(
                    <Button className='w-100' onClick={()=> increaseCartQuantity(id)}>Add To Cart</Button>
                ):(
                    <div className='d-flex align-items-center flex-column'
                    style={{gap:"0.5rem"}}>
                        <div className='d-flex justify-content-center align-items-center mb-2'
                        style={{gap:"0.5rem"}}>
                            <Button className='' onClick={()=> decreaseCartQuantity(id)}>-</Button>
                            <span className='fs-3'>{quantity} in Cart</span>
                            <Button onClick={()=> increaseCartQuantity(id)}>+</Button>
                        </div>
                        <Button className='mb-2' variant='danger' size='sm' onClick={ ()=> removeItemFromCart(id)} >Remove</Button>
                    </div>
                )}
            </div>
        </Card>
)
}

export default Storeitem;
