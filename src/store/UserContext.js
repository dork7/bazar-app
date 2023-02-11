import { createContext, useEffect, useState } from "react";

const UserContext = createContext({
  notification: null,
  setUserInfoHandler: function (userInfo) {},
  setCartInfoHandler: function () {},
});

export function UserContextProvider(props) {
  const [userInfo, setUserInfo] = useState();
  const [cartInfo, setCartInfo] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();

  function setUserInfoHandler(userInfo) {
    setUserInfo(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    clearCart();
  }
  function getUserInfoHandler() {
    return JSON.parse(localStorage.getItem("user"));
  }
  function clearUserInfo() {
    localStorage.setItem("user", JSON.stringify({}));
    setUserLoggedIn(false);
  }
  function setCartInfoHandler(cartInfo) {
    setCartInfo(cartInfo);
  }
  function setUserLoggedIn(value) {
    setIsLoggedIn(value);
  }
  function isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = user && Object.keys(user).length > 0;
    setIsLoggedIn(isLoggedIn);
    return isLoggedIn;
  }

  function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const itemAlreadyExist = cartItems.findIndex(
      (item) => item.productId === product.productId
    );
    if (itemAlreadyExist > -1) {
      cartItems[itemAlreadyExist] = product;
    } else {
      cartItems.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  function getCartItem() {
    return JSON.parse(localStorage.getItem("cart"));
  }
  function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const context = {
    isLoggedIn,
    user: userInfo,
    cat: cartInfo,
    setUserInfo: setUserInfoHandler,
    getUserInfo: getUserInfoHandler,
    setCartInfo: setCartInfoHandler,
    setUserLoggedIn,
    isUserLoggedIn,
    clearUserInfo,
    addToCart,
    getCartItem,
    clearCart,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
