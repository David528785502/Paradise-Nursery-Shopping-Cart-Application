import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import { Link } from "react-router-dom";

const productsData = [
  { id: 1, name: "Aloe Vera", price: 10, category: "Succulents", image: "/images/aloe.jpg" },
  { id: 2, name: "Snake Plant", price: 15, category: "Indoor", image: "/images/snake.jpg" },
  { id: 3, name: "Spider Plant", price: 12, category: "Hanging", image: "/images/spider.jpg" },
  // ... agrega al menos 6 por categoría
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedItems([...addedItems, product.id]);
  };

  const groupedProducts = productsData.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      {/* Barra de navegación */}
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/products">Plantas</Link> | 
        <Link to="/cart">Carrito ({cart.totalQuantity})</Link>
      </nav>

      <h1>Listado de Productos</h1>

      {Object.keys(groupedProducts).map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="product-category">
            {groupedProducts[category].map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} width={100} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addedItems.includes(product.id)}
                >
                  {addedItems.includes(product.id) ? "Agregado" : "Agregar al Carrito"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
