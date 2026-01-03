import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import { Link } from "react-router-dom";

const CartItem = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty >= 1) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>

      {cart.items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width={80} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Precio unitario: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}

          <h2>Total del carrito: ${totalPrice}</h2>

          <button onClick={() => alert("Próximamente")}>Pagar</button>
          <Link to="/products">
            <button>Continuar comprando</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartItem;
