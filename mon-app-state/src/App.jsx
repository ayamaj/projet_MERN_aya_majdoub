
import React from 'react';

import { useTheme } from './context/ThemeContext';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import NotificationToast from './components/NotificationToast';

export default function App() {

  const { theme } = useTheme();

  return (

    <div className={`app-wrapper ${theme}`}>

      <Navbar />

      <h1>TechStore - MERN S6</h1>

      <div className="main-layout">

        <ProductList />

        <Cart />

      </div>

      <NotificationToast />

    </div>

  );

}
