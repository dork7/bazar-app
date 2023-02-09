import { createContext, useEffect, useState } from 'react';

const UserContext = createContext({
  notification: null,
  setUserInfoHandler: function (userInfo) {},
  setCartInfoHandler: function () {},
});

export function UserContextProvider(props) {
  const [userInfo, setUserInfo] = useState();
  const [cartInfo, setCartInfo] = useState();

  function setUserInfoHandler(userInfo) {
    setUserInfo(userInfo);
  }
  function setCartInfoHandler(cartInfo) {
    setCartInfo(cartInfo);
  }
  const context = {
    user: userInfo,
    cat: cartInfo,
    setUserInfo: setUserInfoHandler,
    setCartInfo: setCartInfoHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
