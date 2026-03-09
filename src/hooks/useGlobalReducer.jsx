import React, { useReducer, createContext } from "react";
import storeReducer, { initialStore, actions as createActions } from "../store";

const StoreContext = createContext();
export const Context = StoreContext;

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  
  const boundActions = createActions(dispatch, () => store);

  return (
    <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const ctx = React.useContext(StoreContext);
  return ctx;
}