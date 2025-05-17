// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  books: [],
  authors: [],
  publishers: [],
  categories: [],
  borrows: [],
  user: null,
  loading: false,
  error: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    // Diğer case'ler...
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}