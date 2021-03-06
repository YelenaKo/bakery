import React from "react";
import CartItem from "./CartItem.js";

export default function CartList({value}) {
  const cart = value.productsInCart;
  // console.log("CartList value:", value);
  // console.log("CartList cart:", cart);

  return (
    <div className="container-fluid center-align d-none d-lg-block">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}
